import type { GqlResolvers } from "server/graphql/resolver-types.gen.ts";
import { todo } from "shared/utils.ts";

export const episodeResolvers: GqlResolvers = {
  Mutation: {
    createEpisode: (_parent, _args, _ctx) => todo(),
    updateEpisode: (_parent, _args, _ctx) => todo(),
    deleteEpisode: (_parent, _args, _ctx) => todo(),
  },
  Query: {
    recentlyAddedEpisodes: (_parent, _args, _ctx) => todo(),
    findEpisode: (_parent, _args, _ctx) => todo(),
    findEpisodesByShowId: (_parent, _args, _ctx) => todo(),
    searchEpisodes: (_parent, _args, _ctx) => todo(),
    findEpisodeByName: (_parent, _args, _ctx) => todo(),
  },
  Episode: {
    createdBy: ({ createdByUserId: id }, _, ctx) =>
      ctx.dataloaders.users.load(id),
    updatedBy: ({ updatedByUserId: id }, _, ctx) =>
      ctx.dataloaders.users.load(id),
    deletedBy: ({ deletedByUserId: id }, _, ctx) =>
      id == null ? null : ctx.dataloaders.users.load(id),
    show: (_parent, _args, _ctx) => todo(),
    timestamps: (_parent, _args, _ctx) => todo(),
    urls: (_parent, _args, _ctx) => todo(),
    template: (_parent, _args, _ctx) => todo(),
    userReports: (_parent, _args, _ctx) => todo(),
  },
};
