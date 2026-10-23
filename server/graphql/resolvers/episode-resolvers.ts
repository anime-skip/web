import { and, asc, desc, eq, ilike, isNull, sql, type SQLWrapper } from "drizzle-orm";
import { type DbEpisodeInsert, episodes, timestamps } from "server/db/schema";
import type { GqlContext } from "server/graphql/context";
import { mapDbEpisodeToGqlEpisode } from "server/graphql/mappers";
import type { GqlResolvers } from "server/graphql/resolver-types.gen";
import { prepareGqlInputForDb } from "server/utils/drizzle-utils";
import type { NoOptionals } from "shared/types";

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
        absoluteNumber: args.episodeInput.absoluteNumber || null,
        name: args.episodeInput.name ?? null,
        number: args.episodeInput.number || null,
        season: args.episodeInput.season || null,
        baseDuration: String(args.episodeInput.baseDuration),
        deletedAt: null,
        deletedByUserId: null,
      };
      const [row] = await ctx.deps.db.insert(episodes).values(value).returning();
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
      const [row] = await ctx.deps.db
        .update(episodes)
        .set(updates)
        .where(eq(episodes.id, args.episodeId))
        .returning();
      return mapDbEpisodeToGqlEpisode(row);
    },

    deleteEpisode: async (_parent, args, ctx) => {
      const userId = ctx.authUserId!;
      const now = new Date();
      const [deleted] = await ctx.deps.db.transaction(
        (tx) => ctx.deps.episodeService.softDeleteMany(tx, [args.episodeId], userId, now),
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
      const recent = ctx.deps.db
        .select({
          episodeId: timestamps.episodeId,
          lastCreatedAt: sql<Date>`max(${timestamps.createdAt})`.as("last_created_at"),
        })
        .from(timestamps)
        .groupBy(timestamps.episodeId)
        .orderBy(sql`last_created_at DESC NULLS LAST`)
        .limit(args.limit)
        .offset(args.offset)
        .as("recent");

      const res = await ctx.deps.db
        .select({ episode: episodes })
        .from(recent)
        .innerJoin(episodes, eq(episodes.id, recent.episodeId))
        .orderBy(sql`${recent.lastCreatedAt} DESC NULLS LAST`);
      return res.map((row) => mapDbEpisodeToGqlEpisode(row.episode));
    },

    findEpisode: (_parent, args, ctx) => ctx.dataloaders.episodes.load(args.episodeId),

    findEpisodesByShowId: (_parent, args, ctx) => getEpisodesByShowId(ctx, args.showId),

    searchEpisodes: async (_parent, args, ctx) => {
      const where: SQLWrapper[] = [];
      if (args.search) where.push(ilike(episodes.name, `%${args.search}%`));
      if (args.showId) where.push(eq(episodes.showId, args.showId));

      const res = await ctx.deps.db.query.episodes.findMany({
        where: and(...where),
        limit: args.limit,
        offset: args.offset,
        orderBy: args.sort === "ASC" ? asc(episodes.name) : desc(episodes.name),
      });
      return res.map(mapDbEpisodeToGqlEpisode);
    },

    findEpisodeByName: async (_parent, args, ctx) =>
      ctx.deps.thirdPartyService.findEpisodeByName(args.name),
  },
  Episode: {
    createdBy: ({ createdByUserId: id }, _, ctx) => ctx.dataloaders.users.load(id),

    updatedBy: ({ updatedByUserId: id }, _, ctx) => ctx.dataloaders.users.load(id),

    deletedBy: ({ deletedByUserId: id }, _, ctx) => (id ? ctx.dataloaders.users.load(id) : null),

    show: (parent, _args, ctx) => ctx.dataloaders.shows.load(parent.showId),

    timestamps: (parent, _args, ctx) => ctx.dataloaders.timestampsByEpisodeId.load(parent.id),

    urls: (parent, _args, ctx) => ctx.dataloaders.episodeUrlsByEpisodeId.load(parent.id),

    template: async (parent, _args, ctx) =>
      (await ctx.dataloaders.templatesBySourceEpisodeId.load(parent.id))[0] ?? null,

    userReports: (parent, _args, ctx) => ctx.dataloaders.userReportsByEpisodeId.load(parent.id),
  },
};

export async function getEpisodesByShowId(ctx: GqlContext, showId: string): Promise<GqlEpisode[]> {
  const rows = await ctx.deps.db.query.episodes.findMany({
    where: and(eq(episodes.showId, showId), isNull(episodes.deletedAt)),
  });
  const collator = new Intl.Collator(undefined, { numeric: true });
  rows.sort(
    (a, b) =>
      collator.compare(a.season ?? "", b.season ?? "") ||
      collator.compare(a.number ?? "", b.number ?? "") ||
      collator.compare(a.absoluteNumber ?? "", b.absoluteNumber ?? ""),
  );
  return rows.map(mapDbEpisodeToGqlEpisode);
}
