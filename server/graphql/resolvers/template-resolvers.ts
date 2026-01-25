import type { GqlResolvers } from "server/graphql/resolver-types.gen";
import type { GqlContext } from "server/graphql/context";
import { and, desc, eq, isNull, arrayContains } from "drizzle-orm";
import {
  type DbTemplateInsert,
  templates,
  shows,
  DbTemplateType,
} from "server/db/schema";
import {
  mapDbTemplateToGqlTemplate,
  mapGqlTemplateTypeToDbTemplateType,
} from "server/graphql/mappers";
import { getTemplateTimestampsByTemplateId } from "server/graphql/resolvers/template-timestamp-resolvers";
import type { NoOptionals } from "shared/types";
import { prepareGqlInputForDb } from "server/utils/drizzle-utils";

export const templateResolvers: GqlResolvers = {
  Mutation: {
    createTemplate: async (_parent, args, ctx) => {
      const userId = ctx.authUserId!;
      const now = new Date();
      const value: NoOptionals<Omit<DbTemplateInsert, "id">> = {
        createdAt: now.toISOString(),
        createdByUserId: userId,
        updatedAt: now.toISOString(),
        updatedByUserId: userId,
        deletedAt: null,
        deletedByUserId: null,
        seasons: args.newTemplate.seasons ?? null,
        showId: args.newTemplate.showId,
        sourceEpisodeId: args.newTemplate.sourceEpisodeId,
        type: mapGqlTemplateTypeToDbTemplateType(args.newTemplate.type),
      };
      const [row] = await ctx.db.insert(templates).values(value).returning();
      return mapDbTemplateToGqlTemplate(row);
    },

    updateTemplate: async (_parent, args, ctx) => {
      const userId = ctx.authUserId!;
      const now = new Date();
      const updates: Partial<DbTemplateInsert> = {
        updatedAt: now.toISOString(),
        updatedByUserId: userId,
        ...prepareGqlInputForDb(args.newTemplate),
        type:
          args.newTemplate.type == null
            ? undefined
            : mapGqlTemplateTypeToDbTemplateType(args.newTemplate.type),
      };
      const [row] = await ctx.db
        .update(templates)
        .set(updates)
        .where(eq(templates.id, args.templateId))
        .returning();
      return mapDbTemplateToGqlTemplate(row);
    },

    deleteTemplate: async (_parent, args, ctx) => {
      const userId = ctx.authUserId!;
      const now = new Date();
      const [deleted] = await ctx.db.transaction(
        (tx) =>
          ctx.templateService.softDeleteMany(
            tx,
            [args.templateId],
            userId,
            now,
          ),
        { accessMode: "read write" },
      );
      if (!deleted) {
        throw new Error(`Template not found: ${args.templateId}`);
      }
      return mapDbTemplateToGqlTemplate(deleted);
    },
  },
  Query: {
    findTemplate: (_parent, args, ctx) =>
      ctx.dataloaders.templates.load(args.templateId),

    findTemplatesByShowId: (_parent, args, ctx) =>
      getTemplatesByShowId(ctx, args.showId),

    findTemplateByDetails: async (_parent, args, ctx) => {
      const userId = ctx.authUserId;
      if (!userId) {
        throw new Error(
          "Template not found: FindTemplateByDetails requires authentication",
        );
      }

      // 1. Try matching by source episodeId
      if (args.episodeId) {
        const row = await ctx.db.query.templates.findFirst({
          where: and(
            eq(templates.sourceEpisodeId, args.episodeId),
            eq(templates.createdByUserId, userId),
            isNull(templates.deletedAt),
          ),
          orderBy: desc(templates.createdAt),
        });
        if (row) {
          return mapDbTemplateToGqlTemplate(row);
        }
      }

      // 2 & 3. Try matching by show name (and optionally season)
      if (args.showName) {
        const show = await ctx.db.query.shows.findFirst({
          where: eq(shows.name, args.showName),
        });
        if (!show) {
          throw new Error(`Template not found: FindTemplateByDetails`);
        }

        // 2. Try matching show name + season
        if (args.season) {
          const row = await ctx.db.query.templates.findFirst({
            where: and(
              eq(templates.showId, show.id),
              eq(templates.type, DbTemplateType.Seasons),
              arrayContains(templates.seasons, [args.season]),
              eq(templates.createdByUserId, userId),
              isNull(templates.deletedAt),
            ),
            orderBy: desc(templates.createdAt),
          });
          if (row) {
            return mapDbTemplateToGqlTemplate(row);
          }
        }

        // 3. Try matching just show name (show-wide template)
        const row = await ctx.db.query.templates.findFirst({
          where: and(
            eq(templates.showId, show.id),
            eq(templates.type, DbTemplateType.Show),
            eq(templates.createdByUserId, userId),
            isNull(templates.deletedAt),
          ),
          orderBy: desc(templates.createdAt),
        });
        if (row) {
          return mapDbTemplateToGqlTemplate(row);
        }
      }

      throw new Error(`Template not found: FindTemplateByDetails`);
    },
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
