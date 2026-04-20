import type { GqlResolvers } from "server/graphql/resolver-types.gen";
import { getEpisodeUrlsByEpisodeId } from "server/graphql/resolvers/episode-url-resolvers";
import { getTemplateByEpisodeId } from "server/graphql/resolvers/template-resolvers";
import { getUserReportsByEpisodeId } from "server/graphql/resolvers/user-report-resolvers";
import { getTimestampsByEpisodeId } from "server/graphql/resolvers/timestamp-resolvers";
import type { GqlContext } from "server/graphql/context";
import { type DbEpisodeInsert, episodes } from "server/db/schema";
import {
  and,
  asc,
  desc,
  eq,
  ilike,
  inArray,
  isNull,
  sql,
  type SQLWrapper,
} from "drizzle-orm";
import { mapDbEpisodeToGqlEpisode } from "server/graphql/mappers";
import type { NoOptionals } from "shared/types";
import { prepareGqlInputForDb } from "server/utils/drizzle-utils";

export const episodeResolvers: GqlResolvers = {
  Mutation: {
    createEpisode: async (_parent, args, ctx) => {
      const userId = ctx.authUserId!;
      const now = new Date();
      const value: NoOptionals<Omit<DbEpisodeInsert, "id">> = {
        createdByUserId: userId,
        createdAt: now.toISOString(),
        updatedByUserId: userId,
        updatedAt: now.toISOString(),
        showId: args.showId,
        absoluteNumber: args.episodeInput.absoluteNumber ?? null,
        name: args.episodeInput.name ?? null,
        number: args.episodeInput.number ?? null,
        season: args.episodeInput.season ?? null,
        baseDuration: String(args.episodeInput.baseDuration),
        deletedAt: null,
        deletedByUserId: null,
      };
      const [row] = await ctx.db.insert(episodes).values(value).returning();
      return mapDbEpisodeToGqlEpisode(row);
    },

    updateEpisode: async (_parent, args, ctx) => {
      const userId = ctx.authUserId!;
      const now = new Date();
      const updates: Partial<DbEpisodeInsert> = {
        updatedAt: now.toISOString(),
        updatedByUserId: userId,
        ...prepareGqlInputForDb(args.newEpisode),
        baseDuration: String(args.newEpisode.baseDuration),
      };
      const [row] = await ctx.db
        .update(episodes)
        .set(updates)
        .where(eq(episodes.id, args.episodeId))
        .returning();
      return mapDbEpisodeToGqlEpisode(row);
    },

    deleteEpisode: async (_parent, args, ctx) => {
      const userId = ctx.authUserId!;
      const now = new Date();
      const [deleted] = await ctx.db.transaction(
        (tx) =>
          ctx.episodeService.softDeleteMany(tx, [args.episodeId], userId, now),
        { accessMode: "read write" },
      );
      if (!deleted) {
        throw new Error(`Episode not found: ${args.episodeId}`);
      }
      return mapDbEpisodeToGqlEpisode(deleted);
    },
  },
  Query: {
    recentlyAddedEpisodes: async (_parent, args, ctx) => {
      // What is this query?
      // 1. Grab timestamps with distinct episode ids
      // 2. Grab just the episode_id the timestamp belongs to and sort them by newest first (this is
      //    where we apply pagination)
      // 3. Select all the episodes with those ids, making sure to sort them again since the
      //    timestamps' created_at can be in a different order than the episodes' created_at
      //
      // This isn't perfect (episode could be missing or slightly out of order), but it beats what the
      // the old query - 13ms vs 10s
      // https://github.com/anime-skip/backend/blob/33fd2b842bc847bed67c9b1f9283e78b710cd1f5/internal/database/repos/episodes.go#L137-L153
      const res = await ctx.db
        .select()
        .from(episodes)
        .where(
          inArray(
            episodes.id,
            sql`(
              SELECT episode_id
              FROM (SELECT DISTINCT ON (episode_id) * FROM timestamps) as episode_ids
              ORDER BY created_at DESC NULLS LAST
              LIMIT ${args.limit}
              OFFSET ${args.offset}
            )`,
          ),
        )
        .orderBy(sql`created_at DESC NULLS LAST`);
      return res.map(mapDbEpisodeToGqlEpisode);
    },

    findEpisode: (_parent, args, ctx) =>
      ctx.dataloaders.episodes.load(args.episodeId),

    findEpisodesByShowId: (_parent, args, ctx) =>
      getEpisodesByShowId(ctx, args.showId),

    searchEpisodes: async (_parent, args, ctx) => {
      const where: SQLWrapper[] = [];
      if (args.search) where.push(ilike(episodes.name, `%${args.search}%`));
      if (args.showId) where.push(eq(episodes.showId, args.showId));

      const res = await ctx.db.query.episodes.findMany({
        where: and(...where),
        limit: args.limit,
        offset: args.offset,
        orderBy: args.sort === "ASC" ? asc(episodes.name) : desc(episodes.name),
      });
      return res.map(mapDbEpisodeToGqlEpisode);
    },

    findEpisodeByName: async (_parent, args, ctx) =>
      ctx.thirdPartyService.findEpisodeByName(args.name),
  },
  Episode: {
    createdBy: ({ createdByUserId: id }, _, ctx) =>
      ctx.dataloaders.users.load(id),

    updatedBy: ({ updatedByUserId: id }, _, ctx) =>
      ctx.dataloaders.users.load(id),

    deletedBy: ({ deletedByUserId: id }, _, ctx) =>
      id ? ctx.dataloaders.users.load(id) : null,

    show: (parent, _args, ctx) => ctx.dataloaders.shows.load(parent.showId),

    timestamps: (parent, _args, ctx) =>
      getTimestampsByEpisodeId(ctx, parent.id),

    urls: (parent, _args, ctx) => getEpisodeUrlsByEpisodeId(ctx, parent.id),

    template: (parent, _args, ctx) => getTemplateByEpisodeId(ctx, parent.id),

    userReports: (parent, _args, ctx) =>
      getUserReportsByEpisodeId(ctx, parent.id),
  },
};

export async function getEpisodesByShowId(
  ctx: GqlContext,
  showId: string,
): Promise<GqlEpisode[]> {
  const rows = await ctx.db.query.episodes.findMany({
    where: and(eq(episodes.showId, showId), isNull(episodes.deletedAt)),
  });
  return rows.map(mapDbEpisodeToGqlEpisode);
}
