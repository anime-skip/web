import type { GqlResolvers } from "server/graphql/resolver-types.gen.ts";
import { todo } from "shared/utils.ts";

export const userReportResolvers: GqlResolvers = {
  Mutation: {
    createUserReport: (_parent, _args, _ctx) => todo(),
    resolveUserReport: (_parent, _args, _ctx) => todo(),
  },
  Query: {
    findUserReport: (_parent, _args, _ctx) => todo(),
    findUserReports: (_parent, _args, _ctx) => todo(),
  },
  UserReport: {
    createdBy: ({ createdByUserId: id }, _, ctx) =>
      ctx.dataloaders.users.load(id),
    updatedBy: ({ updatedByUserId: id }, _, ctx) =>
      ctx.dataloaders.users.load(id),
    deletedBy: ({ deletedByUserId: id }, _, ctx) =>
      id == null ? null : ctx.dataloaders.users.load(id),
    timestamp: (_parent, _args, _ctx) => todo(),
    episode: (_parent, _args, _ctx) => todo(),
    episodeUrl: (_parent, _args, _ctx) => todo(),
    show: (_parent, _args, _ctx) => todo(),
  },
};
