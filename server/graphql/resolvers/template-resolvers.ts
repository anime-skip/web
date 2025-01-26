import type { GqlResolvers } from "server/graphql/resolver-types.gen.ts";
import { todo } from "shared/utils.ts";

export const templateResolvers: GqlResolvers = {
  Mutation: {
    createTemplate: (_parent, _args, _ctx) => todo(),

    updateTemplate: (_parent, _args, _ctx) => todo(),

    deleteTemplate: (_parent, _args, _ctx) => todo(),
  },
  Query: {
    findTemplate: (_parent, args, ctx) =>
      ctx.dataloaders.templates.load(args.templateId),

    findTemplatesByShowId: (_parent, _args, _ctx) => todo(),

    findTemplateByDetails: (_parent, _args, _ctx) => todo(),
  },
  Template: {
    createdBy: ({ createdByUserId: id }, _, ctx) =>
      ctx.dataloaders.users.load(id),

    updatedBy: ({ updatedByUserId: id }, _, ctx) =>
      ctx.dataloaders.users.load(id),

    deletedBy: ({ deletedByUserId: id }, _, ctx) =>
      id == null ? null : ctx.dataloaders.users.load(id),

    show: (parent, _args, ctx) => ctx.dataloaders.shows.load(parent.showId),

    sourceEpisode: (parent, _args, ctx) =>
      ctx.dataloaders.episodes.load(parent.sourceEpisodeId),

    timestamps: (_parent, _args, _ctx) => todo(),

    timestampIds: (_parent, _args, _ctx) => todo(),
  },
};
