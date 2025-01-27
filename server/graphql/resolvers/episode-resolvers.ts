import type { GqlResolvers } from "server/graphql/resolver-types.gen.ts";
import { todo } from "shared/utils.ts";
import { getEpisodeUrlsByEpisodeId } from "server/graphql/resolvers/episode-url-resolvers.ts";
import { getTemplateByEpisodeId } from "server/graphql/resolvers/template-resolvers.ts";
import { getUserReportsByEpisodeId } from "server/graphql/resolvers/user-report-resolvers.ts";
import { getTimestampsByEpisodeId } from "server/graphql/resolvers/timestamp-resolvers.ts";
import type { GqlContext } from "server/graphql/context.ts";
import { episodes } from "server/db/schema.ts";
import { and, eq, isNull } from "drizzle-orm";
import { mapDbEpisodeToGqlEpisode } from "server/graphql/mappers.ts";

export const episodeResolvers: GqlResolvers = {
  Mutation: {
    createEpisode: (_parent, _args, _ctx) => todo(),

    updateEpisode: (_parent, _args, _ctx) => todo(),

    deleteEpisode: (_parent, _args, _ctx) => todo(),
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
    where: and(
      eq(episodes.showId, showId),
      isNull(episodes.deletedAt),
    ),
  });
  return rows.map(mapDbEpisodeToGqlEpisode);
}
