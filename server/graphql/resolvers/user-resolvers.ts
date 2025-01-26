import type { GqlResolvers } from "server/graphql/resolver-types.gen.ts";
import { todo } from "shared/utils.ts";

export const userResolvers: GqlResolvers = {
  Query: {
    findUser: (_parent, args, ctx) => ctx.dataloaders.users.load(args.userId),

    findUserByUsername: (_parent, _args, _ctx) => todo(),
  },
  User: {
    adminOfShows: (_parent, _args, _ctx) => todo(),
  },
};
