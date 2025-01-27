import type { GqlResolvers } from "server/graphql/resolver-types.gen.ts";
import type { GqlContext } from "server/graphql/context.ts";
import { users } from "server/db/schema.ts";
import { eq } from "drizzle-orm";
import { mapDbUserToGqlUser } from "server/graphql/mappers.ts";
import { getShowAdminsByUserId } from "server/graphql/resolvers/show-admin-resolvers.ts";

export const userResolvers: GqlResolvers = {
  Query: {
    findUser: (_parent, args, ctx) => ctx.dataloaders.users.load(args.userId),

    findUserByUsername: (_parent, args, ctx) =>
      getUserByUsername(ctx, args.username),
  },
  User: {
    adminOfShows: (parent, _args, ctx) => getShowAdminsByUserId(ctx, parent.id),
  },
};

export async function getOptionalUserByUsername(
  ctx: GqlContext,
  username: string,
): Promise<GqlUser | null> {
  const row = await ctx.db.query.users.findFirst({
    where: eq(users.username, username),
  });
  return row ? mapDbUserToGqlUser(row) : null;
}

export async function getUserByUsername(
  ctx: GqlContext,
  username: string,
): Promise<GqlUser> {
  const user = await getOptionalUserByUsername(ctx, username);
  if (!user) throw Error("User not found with username=" + username);
  return user;
}
