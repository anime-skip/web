import type { GqlResolvers } from "server/graphql/resolver-types.gen";
import { todo } from "shared/utils";
import { getEpisodeUrlsByEpisodeId } from "server/graphql/resolvers/episode-url-resolvers";
import { getTemplateByEpisodeId } from "server/graphql/resolvers/template-resolvers";
import { getUserReportsByEpisodeId } from "server/graphql/resolvers/user-report-resolvers";
import { getTimestampsByEpisodeId } from "server/graphql/resolvers/timestamp-resolvers";
import type { GqlContext } from "server/graphql/context";
import { type DbEpisodeInsert, episodes } from "server/db/schema";
import { and, eq, isNull } from "drizzle-orm";
import { mapDbEpisodeToGqlEpisode } from "server/graphql/mappers";
import type { NoOptionals } from "shared/types";
import { prepareGqlInputForDb, softDeleteEpisodes } from "server/utils/db";

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
      const deleted = await ctx.db.transaction(
        (tx) => softDeleteEpisodes(tx, [args.episodeId], userId, now),
        { accessMode: "read write" },
      );
      return mapDbEpisodeToGqlEpisode(deleted);
    },
  },
  Query: {
    recentlyAddedEpisodes: (_parent, _args, _ctx) => todo(),

    findEpisode: (_parent, args, ctx) =>
      ctx.dataloaders.episodes.load(args.episodeId),

    findEpisodesByShowId: (_parent, args, ctx) =>
      getEpisodesByShowId(ctx, args.showId),

    searchEpisodes: (_parent, _args, _ctx) => todo(),

    findEpisodeByName: (_parent, _args, _ctx) => todo(),
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
