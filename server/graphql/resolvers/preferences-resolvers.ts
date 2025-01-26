import type { GqlResolvers } from "server/graphql/resolver-types.gen.ts";
import { todo } from "shared/utils.ts";

export const preferencesResolvers: GqlResolvers = {
  Mutation: {
    savePreferences: (_parent, _args, _ctx) => todo(),
  },
  Preferences: {
    user: (parent, _args, ctx) => ctx.dataloaders.users.load(parent.userId),
  },
};
