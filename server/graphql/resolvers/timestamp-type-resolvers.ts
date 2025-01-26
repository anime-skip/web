import type { GqlResolvers } from "server/graphql/resolver-types.gen.ts";
import { todo } from "shared/utils.ts";

export const timestampTypeResolvers: GqlResolvers = {
  Mutation: {
    createTimestampType: (_parent, _args, _ctx) => todo(),

    updateTimestampType: (_parent, _args, _ctx) => todo(),

    deleteTimestampType: (_parent, _args, _ctx) => todo(),
  },
  Query: {
    findTimestampType: (_parent, args, ctx) =>
      ctx.dataloaders.timestampTypes.load(args.timestampTypeId),

    allTimestampTypes: (_parent, _args, _ctx) => todo(),
  },
  TimestampType: {
    createdBy: ({ createdByUserId: id }, _, ctx) =>
      ctx.dataloaders.users.load(id),

    updatedBy: ({ updatedByUserId: id }, _, ctx) =>
      ctx.dataloaders.users.load(id),

    deletedBy: ({ deletedByUserId: id }, _, ctx) =>
      id == null ? null : ctx.dataloaders.users.load(id),
  },
};
