import type { GqlResolvers } from "server/graphql/resolver-types.gen.ts";
import { todo } from "shared/utils.ts";

export const userReportResolvers: GqlResolvers = {
  Mutation: {
    createUserReport: (_parent, _args, _ctx) => todo(),

    resolveUserReport: (_parent, _args, _ctx) => todo(),
  },
  Query: {
    findUserReport: (_parent, args, ctx) =>
      ctx.dataloaders.userReports.load(args.id),

    findUserReports: (_parent, _args, _ctx) => todo(),
  },
  UserReport: {
    createdBy: ({ createdByUserId: id }, _, ctx) =>
      ctx.dataloaders.users.load(id),

    updatedBy: ({ updatedByUserId: id }, _, ctx) =>
      ctx.dataloaders.users.load(id),

    deletedBy: ({ deletedByUserId: id }, _, ctx) =>
      id == null ? null : ctx.dataloaders.users.load(id),

    timestamp: (parent, _args, ctx) =>
      parent.timestampId
        ? ctx.dataloaders.timestamps.load(parent.timestampId)
        : null,

    episode: (parent, _args, ctx) =>
      parent.episodeId ? ctx.dataloaders.episodes.load(parent.episodeId) : null,

    episodeUrl: (parent, _args, ctx) =>
      parent.episodeUrlString
        ? ctx.dataloaders.episodeUrls.load(parent.episodeUrlString)
        : null,

    show: (parent, _args, ctx) =>
      parent.showId ? ctx.dataloaders.shows.load(parent.showId) : null,
  },
};
