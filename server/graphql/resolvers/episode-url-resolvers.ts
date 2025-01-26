import type { GqlResolvers } from "server/graphql/resolver-types.gen.ts";
import { todo } from "shared/utils.ts";

export const episodeUrlResolvers: GqlResolvers = {
  Mutation: {
    createEpisodeUrl: (_parent, _args, _ctx) => todo(),

    deleteEpisodeUrl: (_parent, _args, _ctx) => todo(),

    updateEpisodeUrl: (_parent, _args, _ctx) => todo(),
  },
  Query: {
    findEpisodeUrl: (_parent, args, ctx) =>
      ctx.dataloaders.episodeUrls.load(args.episodeUrl),

    findEpisodeUrlsByEpisodeId: (_parent, _args, _ctx) => todo(),
  },
  EpisodeUrl: {
    createdBy: ({ createdByUserId: id }, _, ctx) =>
      ctx.dataloaders.users.load(id),

    updatedBy: ({ updatedByUserId: id }, _, ctx) =>
      ctx.dataloaders.users.load(id),

    episode: (parent, _args, ctx) =>
      ctx.dataloaders.episodes.load(parent.episodeId),

    url: (_parent, _args, _ctx) => todo(),
  },
};
