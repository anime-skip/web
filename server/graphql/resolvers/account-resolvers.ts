import type { GqlResolvers } from "server/graphql/resolver-types.gen";
import { md5, todo } from "shared/utils";
import { eq, or } from "drizzle-orm";
import { type DbUser, DbUserRole, preferences, users } from "server/db/schema";
import { mapDbUserToGqlAccount } from "server/graphql/mappers";
import { auth } from "server/utils/auth";
import type { AnimeSkipDatabase } from "server/services/db";
import { validateEmail, validateUsername } from "server/utils/validation";
import { verifyRecaptcha } from "server/utils/recaptcha";
import {
  sendAccountVerificationEmail,
  sendPasswordResetEmail,
  sendWelcomeEmail,
} from "server/utils/emails";
import type { GqlContext } from "server/graphql/context";
import { getShowAdminsByUserId } from "server/graphql/resolvers/show-admin-resolvers";
import { getOptionalUserByUsername } from "server/graphql/resolvers/user-resolvers";

export const accountResolvers: GqlResolvers = {
  Mutation: {
    createAccount: async (_parent, args, ctx) => {
      ctx.logger.verbose("Additional input validation");
      const username = args.username.trim();
      const email = args.email.trim();
      const passwordHash = args.passwordHash.trim();

      validateUsername(username);
      validateEmail(email);

      ctx.logger.verbose("Verify recaptcha");
      await verifyRecaptcha(args.recaptchaResponse, ctx.ip);

      ctx.logger.verbose("Checking for existing username");
      const existingUserByUsername = await getOptionalUserByUsername(
        ctx,
        username,
      );
      if (existingUserByUsername) {
        throw Error(
          `Username '${username}' is already taken, use a different one`,
        );
      }

      ctx.logger.verbose("Checking for existing email");
      const existingUserByEmail = await ctx.db.query.users.findFirst({
        where: eq(users.email, email),
      });
      if (existingUserByEmail) {
        throw Error(`Email '${email}' is already taken, use a different one`);
      }

      ctx.logger.verbose("Generating passwordHash");
      const encryptedPasswordHash = await auth.encryptPassword(passwordHash);

      ctx.logger.verbose("Creating user and preferences");
      const [user] = await ctx.db
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
      await ctx.db.insert(preferences).values({
        userId,
        updatedAt: new Date().toISOString(),
      });

      ctx.logger.verbose("Sending welcome email");
      await sendWelcomeEmail(user);

      ctx.logger.verbose("Sending verification email");
      const verifyEmailToken = await auth.createToken("verify-email", {
        userId,
      });
      await sendAccountVerificationEmail(user, verifyEmailToken);

      ctx.logger.verbose("Returning LoginData");
      return createLoginData(user);
    },

    changePassword: async (_parent, args, ctx) => {
      const userId = ctx.authUserId!;
      const user = await requireUser(ctx, userId);

      const oldPassword = md5(args.oldPassword.trim());
      const isMatch = await auth.comparePasswords(
        oldPassword,
        user.passwordHash,
      );
      if (!isMatch) {
        throw Error("Old password is not correct");
      }

      return await updatePassword(ctx.db, user, args);
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
      const { userId } = await auth.validateToken(
        "verify-email",
        args.validationToken,
      );
      const user = await requireUser(ctx, userId);

      await ctx.db
        .update(users)
        .set({ emailVerified: true })
        .where(eq(users.id, userId));
      user.emailVerified = true;

      return mapDbUserToGqlAccount(user);
    },

    requestPasswordReset: async (_parent, args, ctx) => {
      validateEmail(args.email);

      await verifyRecaptcha(args.recaptchaResponse, ctx.ip);
      const user = await ctx.db.query.users.findFirst({
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
      const { userId } = await auth.validateToken(
        "reset-password",
        args.passwordResetToken,
      );
      const user = await requireUser(ctx, userId);

      return await updatePassword(ctx.db, user, args);
    },

    deleteAccountRequest: async (_parent, { passwordHash }, ctx) => {
      const userId = ctx.authUserId!;
      const user = await requireUser(ctx, userId);

      const isMatch = await auth.comparePasswords(
        passwordHash,
        user.passwordHash,
      );
      if (!isMatch) {
        throw Error("Passwords do not match");
      }

      todo();
    },

    deleteAccount: async (_parent, { deleteToken }, ctx) => {
      const { userId } = await auth.validateToken(
        "delete-account",
        deleteToken,
      );
      const _user = await requireUser(ctx, userId);

      todo();
    },
  },
  Query: {
    login: async (_parent, args, ctx) => {
      const usernameOrEmail = args.usernameEmail.trim();
      const passwordHash = args.passwordHash.trim();
      const user = await ctx.db.query.users.findFirst({
        where: or(
          eq(users.username, usernameOrEmail),
          eq(users.email, usernameOrEmail),
        ),
      });
      if (user == null) {
        throw Error(
          `Failed to get account with username or email = "${usernameOrEmail}"`,
        );
      }

      const passwordsMatch = await auth.comparePasswords(
        passwordHash,
        user.passwordHash,
      );
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

    account: (_parent, _args, ctx) =>
      ctx.dataloaders.accounts.load(ctx.authUserId!),
  },
  Account: {
    preferences: (parent, _args, ctx) =>
      ctx.dataloaders.preferences.byUserId.load(parent.id),

    adminOfShows: (parent, _args, ctx) => getShowAdminsByUserId(ctx, parent.id),
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
  db: AnimeSkipDatabase,
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
  await db
    .update(users)
    .set({ passwordHash: user.passwordHash })
    .where(eq(users.id, user.id));

  return createLoginData(user);
}

async function createLoginData(user: DbUser): Promise<GqlLoginData> {
  return {
    account: mapDbUserToGqlAccount(user),
    authToken: await auth.createToken("access", { userId: user.id }),
    refreshToken: await auth.createToken("refresh", { userId: user.id }),
  };
}
