import type { GqlResolvers } from "server/graphql/resolver-types.gen.ts";
import { todo } from "shared/utils.ts";

export const showResolvers: GqlResolvers = {
  Mutation: {
    createShow: (_parent, _args, _ctx) => todo(),
    updateShow: (_parent, _args, _ctx) => todo(),
    deleteShow: (_parent, _args, _ctx) => todo(),
  },
  Query: {
    findShow: (_parent, _args, _ctx) => todo(),
    findShowsByExternalId: (_parent, _args, _ctx) => todo(),
    searchShows: (_parent, _args, _ctx) => todo(),
  },
  Show: {
    createdBy: ({ createdByUserId: id }, _, ctx) =>
      ctx.usersDataloader.load(id),
    updatedBy: ({ updatedByUserId: id }, _, ctx) =>
      ctx.usersDataloader.load(id),
    deletedBy: ({ deletedByUserId: id }, _, ctx) =>
      id == null ? null : ctx.usersDataloader.load(id),
    admins: (_parent, _args, _ctx) => todo(),
    episodes: (_parent, _args, _ctx) => todo(),
    templates: (_parent, _args, _ctx) => todo(),
    externalLinks: (_parent, _args, _ctx) => todo(),
    seasonCount: (_parent, _args, _ctx) => todo(),
    episodeCount: (_parent, _args, _ctx) => todo(),
  },
};
