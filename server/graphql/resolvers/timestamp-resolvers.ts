import type { GqlResolvers } from "server/graphql/resolver-types.gen.ts";
import { todo } from "shared/utils.ts";

export const timestampResolvers: GqlResolvers = {
  Mutation: {
    createTimestamp: (_parent, _args, _ctx) => todo(),
    updateTimestamp: (_parent, _args, _ctx) => todo(),
    deleteTimestamp: (_parent, _args, _ctx) => todo(),
    updateTimestamps: (_parent, _args, _ctx) => todo(),
  },
  Query: {
    findTimestamp: (_parent, _args, _ctx) => todo(),
    findTimestampsByEpisodeId: (_parent, _args, _ctx) => todo(),
  },
  Timestamp: {
    createdBy: ({ createdByUserId: id }, _, ctx) =>
      ctx.usersDataloader.load(id),
    updatedBy: ({ updatedByUserId: id }, _, ctx) =>
      ctx.usersDataloader.load(id),
    deletedBy: ({ deletedByUserId: id }, _, ctx) =>
      id == null ? null : ctx.usersDataloader.load(id),
    type: (_parent, _args, _ctx) => todo(),
    episode: (_parent, _args, _ctx) => todo(),
  },
};
