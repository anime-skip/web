import { createLogger } from "@aklinker1/logger";
import { eq, or } from "drizzle-orm";
import { type DbUser, DbUserRole, preferences, users } from "server/db/schema";
import type { GqlContext } from "server/graphql/context";
import { mapDbUserToGqlAccount } from "server/graphql/mappers";
import type { GqlResolvers } from "server/graphql/resolver-types.gen";
import { getOptionalUserByUsername } from "server/graphql/resolvers/user-resolvers";
import type { Database } from "server/services/db";
import { auth } from "server/utils/auth";
import {
  sendAccountVerificationEmail,
  sendPasswordResetEmail,
  sendWelcomeEmail,
} from "server/utils/emails";
import { verifyRecaptcha } from "server/utils/recaptcha";
import { validateEmail, validateUsername } from "server/utils/validation";
import { md5 } from "shared/utils";

const logger = createLogger("account-resolvers");

export const accountResolvers: GqlResolvers = {
  Mutation: {
    createAccount: async (_parent, args, ctx) => {
      logger.debug("Additional input validation");
      const username = args.username.trim();
      const email = args.email.trim();
      const passwordHash = args.passwordHash.trim();

      validateUsername(username);
      validateEmail(email);

      logger.debug("Verify recaptcha");
      await verifyRecaptcha(args.recaptchaResponse, ctx.ip);

      logger.debug("Checking for existing username");
      const existingUserByUsername = await getOptionalUserByUsername(ctx, username);
      if (existingUserByUsername) {
        throw Error(`Username '${username}' is already taken, use a different one`);
      }

      logger.debug("Checking for existing email");
      const existingUserByEmail = await ctx.deps.db.query.users.findFirst({
        where: eq(users.email, email),
      });
      if (existingUserByEmail) {
        throw Error(`Email '${email}' is already taken, use a different one`);
      }

      logger.debug("Generating passwordHash");
      const encryptedPasswordHash = await auth.encryptPassword(passwordHash);

      logger.debug("Creating user and preferences");
      const [user] = await ctx.deps.db
        .insert(users)
        .values({
          email,
          emailVerified: false,
          role: DbUserRole.User,
          passwordHash: encryptedPasswordHash,
          username,
          profileUrl: "",
          createdAt: new Date().toISOString(),
        })
        .returning();
      const userId = user.id;
      await ctx.deps.db.insert(preferences).values({
        userId,
        updatedAt: new Date().toISOString(),
      });

      logger.debug("Sending welcome email");
      await sendWelcomeEmail(user);

      logger.debug("Sending verification email");
      const verifyEmailToken = await auth.createToken("verify-email", {
        userId,
      });
      await sendAccountVerificationEmail(user, verifyEmailToken);

      logger.debug("Returning LoginData");
      return createLoginData(user);
    },

    changePassword: async (_parent, args, ctx) => {
      const userId = ctx.authUserId!;
      const user = await requireUser(ctx, userId);

      const oldPassword = md5(args.oldPassword.trim());
      const isMatch = await auth.comparePasswords(oldPassword, user.passwordHash);
      if (!isMatch) {
        throw Error("Old password is not correct");
      }

      return await updatePassword(ctx.deps.db, user, args);
    },

    resendVerificationEmail: async (_parent, args, ctx) => {
      const userId = ctx.authUserId!;

      await verifyRecaptcha(args.recaptchaResponse, ctx.ip);
      const user = await requireUser(ctx, userId);
      const token = await auth.createToken("verify-email", { userId });
      await sendAccountVerificationEmail(user, token);

      return true;
    },

    verifyEmailAddress: async (_parent, args, ctx) => {
      const { userId } = await auth.validateToken("verify-email", args.validationToken);
      const user = await requireUser(ctx, userId);

      await ctx.deps.db.update(users).set({ emailVerified: true }).where(eq(users.id, userId));
      user.emailVerified = true;

      return mapDbUserToGqlAccount(user);
    },

    requestPasswordReset: async (_parent, args, ctx) => {
      validateEmail(args.email);

      await verifyRecaptcha(args.recaptchaResponse, ctx.ip);
      const user = await ctx.deps.db.query.users.findFirst({
        where: eq(users.email, args.email),
      });

      // Don't provide any hints if the email is not found
      if (!user) return true;

      const token = await auth.createToken("reset-password", {
        userId: user.id,
      });
      await sendPasswordResetEmail(user, token);
      return true;
    },

    resetPassword: async (_parent, args, ctx) => {
      const { userId } = await auth.validateToken("reset-password", args.passwordResetToken);
      const user = await requireUser(ctx, userId);

      return await updatePassword(ctx.deps.db, user, args);
    },

    deleteMyAccount: async (_parent, _args, ctx) => {
      const userId = ctx.authUserId!;

      const anonymized = await ctx.deps.db.transaction(async (tx) => {
        return ctx.deps.userService.anonymize(tx, userId, new Date());
      });

      return mapDbUserToGqlAccount(anonymized);
    },

    deleteAccount: async (_parent, { userId }, ctx) => {
      const anonymized = await ctx.deps.db.transaction(async (tx) => {
        return ctx.deps.userService.anonymize(tx, userId, new Date());
      });

      return mapDbUserToGqlAccount(anonymized);
    },
  },
  Query: {
    login: async (_parent, args, ctx) => {
      const usernameOrEmail = args.usernameEmail.trim();
      const passwordHash = args.passwordHash.trim();
      const user = await ctx.deps.db.query.users.findFirst({
        where: or(eq(users.username, usernameOrEmail), eq(users.email, usernameOrEmail)),
      });
      if (user == null) {
        throw Error(`Failed to get account with username or email = "${usernameOrEmail}"`);
      }

      const passwordsMatch = await auth.comparePasswords(passwordHash, user.passwordHash);
      if (!passwordsMatch) {
        throw Error("Bad login credentials");
      }

      return createLoginData(user);
    },

    loginRefresh: async (_parent, { refreshToken }, ctx) => {
      const { userId } = await auth.validateToken("refresh", refreshToken);
      const user = await requireUser(ctx, userId);
      return createLoginData(user);
    },

    account: (_parent, _args, ctx) => ctx.dataloaders.accounts.load(ctx.authUserId!),
  },
  Account: {
    preferences: (parent, _args, ctx) => ctx.dataloaders.preferences.byUserId.load(parent.id),
  },
};

async function requireUser(ctx: GqlContext, userId: string): Promise<DbUser> {
  const user = await ctx.dataloaders.dbUsers.load(userId);
  if (user == null) {
    throw Error(`User not found with id: ${userId}`);
  }
  return user;
}

async function updatePassword(
  db: Database,
  user: DbUser,
  args: { newPassword: string; confirmNewPassword: string },
): Promise<GqlLoginData> {
  const newPassword = args.newPassword.trim();
  const confirmNewPassword = args.confirmNewPassword.trim();
  if (newPassword !== confirmNewPassword) {
    throw Error("Passwords did not match");
  }
  if (newPassword == "") {
    throw Error("New password is not valid, it cannot be empty");
  }

  user.passwordHash = await auth.encryptPassword(md5(newPassword));
  await db.update(users).set({ passwordHash: user.passwordHash }).where(eq(users.id, user.id));

  return createLoginData(user);
}

async function createLoginData(user: DbUser): Promise<GqlLoginData> {
  return {
    account: mapDbUserToGqlAccount(user),
    authToken: await auth.createToken("access", { userId: user.id }),
    refreshToken: await auth.createToken("refresh", { userId: user.id }),
  };
}
