import type { GqlResolvers } from "server/graphql/resolver-types.gen.ts";
import { todo } from "shared/utils.ts";
import type { GqlContext } from "server/graphql/context.ts";
import { and, eq, isNull } from "drizzle-orm";
import { timestamps } from "server/db/schema.ts";
import { mapDbTimestampToGqlTimestamp } from "server/graphql/mappers.ts";

export const timestampResolvers: GqlResolvers = {
  Mutation: {
    createTimestamp: (_parent, _args, _ctx) => todo(),

    updateTimestamp: (_parent, _args, _ctx) => todo(),

    deleteTimestamp: (_parent, _args, _ctx) => todo(),

    updateTimestamps: (_parent, _args, _ctx) => todo(),
  },
  Query: {
    findTimestamp: (_parent, args, ctx) =>
      ctx.dataloaders.timestamps.load(args.timestampId),

    findTimestampsByEpisodeId: (_parent, args, ctx) =>
      getTimestampsByEpisodeId(ctx, args.episodeId),
  },
  Timestamp: {
    createdBy: ({ createdByUserId: id }, _, ctx) =>
      ctx.dataloaders.users.load(id),

    updatedBy: ({ updatedByUserId: id }, _, ctx) =>
      ctx.dataloaders.users.load(id),

    deletedBy: ({ deletedByUserId: id }, _, ctx) =>
      id ? ctx.dataloaders.users.load(id) : null,

    type: (parent, _args, ctx) =>
      ctx.dataloaders.timestampTypes.load(parent.typeId),

    episode: (parent, _args, ctx) =>
      ctx.dataloaders.episodes.load(parent.episodeId),
  },
};

export async function getTimestampsByEpisodeId(
  ctx: GqlContext,
  episodeId: string,
): Promise<GqlTimestamp[]> {
  const rows = await ctx.db.query.timestamps.findMany({
    where: and(
      eq(timestamps.episodeId, episodeId),
      isNull(timestamps.deletedAt),
    ),
  });
  return rows.map(mapDbTimestampToGqlTimestamp);
}
