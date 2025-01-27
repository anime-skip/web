import type { GqlResolvers } from "server/graphql/resolver-types.gen.ts";
import { todo } from "shared/utils.ts";
import type { GqlContext } from "server/graphql/context.ts";
import { eq } from "drizzle-orm";
import { episodeUrls } from "server/db/schema.ts";
import { mapDbEpisodeUrlToGqlEpisodeUrl } from "server/graphql/mappers.ts";

export const episodeUrlResolvers: GqlResolvers = {
  Mutation: {
    createEpisodeUrl: (_parent, _args, _ctx) => todo(),

    deleteEpisodeUrl: (_parent, _args, _ctx) => todo(),

    updateEpisodeUrl: (_parent, _args, _ctx) => todo(),
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
