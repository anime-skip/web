import type { ServerState } from "server/state.ts";
import { mapDbUserToGqlUser } from "server/graphql/mappers.ts";

export function createUserResolver<T, TKey extends keyof T>(key: TKey) {
  return async (
    parent: T,
    _args: unknown,
    ctx: ServerState,
  ): Promise<GqlUser> => {
    const user = await ctx.usersDataloader.load(parent[key] as string);
    return mapDbUserToGqlUser(user);
  };
}

export function createMaybeUserResolver<T, TKey extends keyof T>(key: TKey) {
  return async (
    parent: T,
    _args: unknown,
    ctx: ServerState,
  ): Promise<GqlUser | null> => {
    if (parent[key] == null) return null;

    const user = await ctx.usersDataloader.load(parent[key] as string);
    return mapDbUserToGqlUser(user);
  };
}
