import type { GqlResolvers } from "server/graphql/resolver-types.gen.ts";
import { todo } from "shared/utils.ts";

export const episodeUrlResolvers: GqlResolvers = {
  Mutation: {
    createEpisodeUrl: (_parent, _args, _ctx) => todo(),
    deleteEpisodeUrl: (_parent, _args, _ctx) => todo(),
    updateEpisodeUrl: (_parent, _args, _ctx) => todo(),
  },
  Query: {
    findEpisodeUrl: (_parent, _args, _ctx) => todo(),
    findEpisodeUrlsByEpisodeId: (_parent, _args, _ctx) => todo(),
  },
  EpisodeUrl: {
    createdBy: ({ createdByUserId: id }, _, ctx) =>
      ctx.usersDataloader.load(id),
    updatedBy: ({ updatedByUserId: id }, _, ctx) =>
      ctx.usersDataloader.load(id),
    episode: (_parent, _args, _ctx) => todo(),
    url: (_parent, _args, _ctx) => todo(),
  },
};
