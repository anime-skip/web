import type { GqlResolvers } from "server/graphql/resolver-types.gen.ts";
import { todo } from "shared/utils.ts";
import type { GqlContext } from "server/graphql/context.ts";
import { and, desc, eq, isNull } from "drizzle-orm";
import { templates } from "server/db/schema.ts";
import { mapDbTemplateToGqlTemplate } from "server/graphql/mappers.ts";
import { getTemplateTimestampsByTemplateId } from "server/graphql/resolvers/template-timestamp-resolvers.ts";

export const templateResolvers: GqlResolvers = {
  Mutation: {
    createTemplate: (_parent, _args, _ctx) => todo(),

    updateTemplate: (_parent, _args, _ctx) => todo(),

    deleteTemplate: (_parent, _args, _ctx) => todo(),
  },
  Query: {
    findTemplate: (_parent, args, ctx) =>
      ctx.dataloaders.templates.load(args.templateId),

    findTemplatesByShowId: (_parent, args, ctx) =>
      getTemplatesByShowId(ctx, args.showId),

    findTemplateByDetails: (_parent, _args, _ctx) => todo(),
  },
  Template: {
    createdBy: ({ createdByUserId: id }, _, ctx) =>
      ctx.dataloaders.users.load(id),

    updatedBy: ({ updatedByUserId: id }, _, ctx) =>
      ctx.dataloaders.users.load(id),

    deletedBy: ({ deletedByUserId: id }, _, ctx) =>
      id ? ctx.dataloaders.users.load(id) : null,

    show: (parent, _args, ctx) => ctx.dataloaders.shows.load(parent.showId),

    sourceEpisode: (parent, _args, ctx) =>
      ctx.dataloaders.episodes.load(parent.sourceEpisodeId),

    timestamps: async (parent, _args, ctx) => {
      const templateTimestamps = await getTemplateTimestampsByTemplateId(
        ctx,
        parent.id,
      );
      const timestamps = await ctx.dataloaders.timestamps.loadMany(
        templateTimestamps.map((timestamp) => timestamp.timestampId),
      );
      return timestamps.filter((t) => !(t instanceof Error)) as GqlTimestamp[];
    },

    timestampIds: async (parent, _args, ctx) => {
      const templateTimestamps = await getTemplateTimestampsByTemplateId(
        ctx,
        parent.id,
      );
      return templateTimestamps.map((timestamp) => timestamp.timestampId);
    },
  },
};

export async function getTemplateByEpisodeId(
  ctx: GqlContext,
  episodeId: string,
): Promise<GqlTemplate | null> {
  const userId = ctx.authUserId;
  const row = await ctx.db.query.templates.findFirst({
    where: and(
      eq(templates.sourceEpisodeId, episodeId),
      isNull(templates.deletedAt),
      ...(userId ? [eq(templates.createdByUserId, userId)] : []),
    ),
    orderBy: desc(templates.createdAt),
  });
  return row ? mapDbTemplateToGqlTemplate(row) : null;
}

export async function getTemplatesByShowId(
  ctx: GqlContext,
  showId: string,
): Promise<GqlTemplate[]> {
  const userId = ctx.authUserId;
  const rows = await ctx.db.query.templates.findMany({
    where: and(
      eq(templates.showId, showId),
      isNull(templates.deletedAt),
      ...(userId ? [eq(templates.createdByUserId, userId)] : []),
    ),
    orderBy: desc(templates.createdAt),
  });
  return rows.map(mapDbTemplateToGqlTemplate);
}
