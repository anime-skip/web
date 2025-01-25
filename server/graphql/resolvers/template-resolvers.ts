import type { GqlResolvers } from "server/graphql/resolver-types.gen.ts";
import { todo } from "shared/utils.ts";

export const templateResolvers: GqlResolvers = {
  Mutation: {
    createTemplate: (_parent, _args, _ctx) => todo(),
    updateTemplate: (_parent, _args, _ctx) => todo(),
    deleteTemplate: (_parent, _args, _ctx) => todo(),
  },
  Query: {
    findTemplate: (_parent, _args, _ctx) => todo(),
    findTemplatesByShowId: (_parent, _args, _ctx) => todo(),
    findTemplateByDetails: (_parent, _args, _ctx) => todo(),
  },
  Template: {
    createdBy: ({ createdByUserId: id }, _, ctx) =>
      ctx.usersDataloader.load(id),
    updatedBy: ({ updatedByUserId: id }, _, ctx) =>
      ctx.usersDataloader.load(id),
    deletedBy: ({ deletedByUserId: id }, _, ctx) =>
      id == null ? null : ctx.usersDataloader.load(id),
    show: (_parent, _args, _ctx) => todo(),
    sourceEpisode: (_parent, _args, _ctx) => todo(),
    timestamps: (_parent, _args, _ctx) => todo(),
    timestampIds: (_parent, _args, _ctx) => todo(),
  },
};
