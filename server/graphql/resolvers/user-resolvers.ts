import { eq } from "drizzle-orm";
import { users } from "server/db/schema";
import type { GqlContext } from "server/graphql/context";
import { mapDbUserToGqlUser } from "server/graphql/mappers";
import type { GqlResolvers } from "server/graphql/resolver-types.gen";

export const userResolvers: GqlResolvers = {
  Query: {
    findUser: (_parent, args, ctx) => ctx.dataloaders.users.load(args.userId),

    findUserByUsername: (_parent, args, ctx) => getUserByUsername(ctx, args.username),
  },
};

export async function getOptionalUserByUsername(
  ctx: GqlContext,
  username: string,
): Promise<GqlUser | null> {
  const row = await ctx.deps.db.query.users.findFirst({
    where: eq(users.username, username),
  });
  return row ? mapDbUserToGqlUser(row) : null;
}

export async function getUserByUsername(ctx: GqlContext, username: string): Promise<GqlUser> {
  const user = await getOptionalUserByUsername(ctx, username);
  if (!user) throw Error("User not found with username=" + username);
  return user;
}
