import type { GqlResolvers } from "server/graphql/resolver-types.gen.ts";
import { todo } from "shared/utils.ts";
import type { GqlContext } from "server/graphql/context.ts";
import { eq } from "drizzle-orm";
import { type DbEpisodeUrlInsert, episodeUrls } from "server/db/schema.ts";
import {
  mapDbEpisodeUrlToGqlEpisodeUrl,
  mapUrlToDbEpisodeSource,
} from "server/graphql/mappers.ts";
import type { NoOptionals } from "shared/types.ts";
import {
  hardDeleteEpisodeUrls,
  prepareGqlInputForDb,
} from "server/utils/db.ts";

export const episodeUrlResolvers: GqlResolvers = {
  Mutation: {
    createEpisodeUrl: async (_parent, args, ctx) => {
      const userId = ctx.authUserId!;
      const now = new Date();
      const value: NoOptionals<DbEpisodeUrlInsert> = {
        url: args.episodeUrlInput.url,
        createdAt: now.toISOString(),
        createdByUserId: userId,
        updatedAt: now.toISOString(),
        updatedByUserId: userId,
        duration: args.episodeUrlInput.duration == null
          ? null
          : String(args.episodeUrlInput.duration),
        episodeId: args.episodeId,
        source: mapUrlToDbEpisodeSource(args.episodeUrlInput.url),
        timestampsOffset: args.episodeUrlInput.timestampsOffset == null
          ? null
          : String(args.episodeUrlInput.timestampsOffset),
      };
      const [row] = await ctx.db.insert(episodeUrls).values(value).returning();
      return mapDbEpisodeUrlToGqlEpisodeUrl(row);
    },

    deleteEpisodeUrl: async (_parent, args, ctx) => {
      const deleted = await ctx.db.transaction(
        (tx) => hardDeleteEpisodeUrls(tx, [args.episodeUrl]),
        { accessMode: "read write" },
      );
      return mapDbEpisodeUrlToGqlEpisodeUrl(deleted);
    },

    updateEpisodeUrl: async (_parent, args, ctx) => {
      const userId = ctx.authUserId!;
      const now = new Date();
      const updates: Partial<DbEpisodeUrlInsert> = {
        updatedAt: now.toISOString(),
        updatedByUserId: userId,
        ...prepareGqlInputForDb(args.newEpisodeUrl),
        duration: args.newEpisodeUrl.duration != null
          ? String(args.newEpisodeUrl.duration)
          : args.newEpisodeUrl.duration,
        timestampsOffset: args.newEpisodeUrl.timestampsOffset != null
          ? String(args.newEpisodeUrl.timestampsOffset)
          : args.newEpisodeUrl.timestampsOffset,
      };
      const [row] = await ctx.db
        .update(episodeUrls)
        .set(updates)
        .where(eq(episodeUrls.url, args.episodeUrl))
        .returning();
      return mapDbEpisodeUrlToGqlEpisodeUrl(row);
    },
  },
  Query: {
    findEpisodeUrl: (_parent, args, ctx) =>
      ctx.dataloaders.episodeUrls.load(args.episodeUrl),

    findEpisodeUrlsByEpisodeId: (_parent, args, ctx) =>
      getEpisodeUrlsByEpisodeId(ctx, args.episodeId),
  },
  EpisodeUrl: {
    createdBy: ({ createdByUserId: id }, _, ctx) =>
      ctx.dataloaders.users.load(id),

    updatedBy: ({ updatedByUserId: id }, _, ctx) =>
      ctx.dataloaders.users.load(id),

    episode: (parent, _args, ctx) =>
      ctx.dataloaders.episodes.load(parent.episodeId),

    url: (parent, _args, _ctx) => cleanEpisodeUrl(parent.url),
  },
};

function cleanEpisodeUrl(url: string): string {
  const nineAnimeRegexp = /9anime\.\w+/;
  url = url.replace(nineAnimeRegexp, "9anime.to");
  return url;
}

export async function getEpisodeUrlsByEpisodeId(
  ctx: GqlContext,
  episodeId: string,
): Promise<GqlEpisodeUrl[]> {
  const rows = await ctx.db.query.episodeUrls.findMany({
    where: eq(episodeUrls.episodeId, episodeId),
  });
  return rows.map(mapDbEpisodeUrlToGqlEpisodeUrl);
}
