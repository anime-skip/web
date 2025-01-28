import type { GqlResolvers } from "server/graphql/resolver-types.gen";
import { todo } from "shared/utils";
import type { GqlContext } from "server/graphql/context";
import { and, eq, isNull } from "drizzle-orm";
import { type DbTimestampInsert, timestamps } from "server/db/schema";
import {
  mapDbTimestampToGqlTimestamp,
  mapGqlTimestampSourceToDbTimestampSource,
} from "server/graphql/mappers";
import type { NoOptionals } from "shared/types";
import { prepareGqlInputForDb, softDeleteTimestamps } from "server/utils/db";

export const timestampResolvers: GqlResolvers = {
  Mutation: {
    createTimestamp: async (_parent, args, ctx) => {
      const userId = ctx.authUserId!;
      const now = new Date();
      const value: NoOptionals<Omit<DbTimestampInsert, "id">> = {
        createdAt: now.toISOString(),
        createdByUserId: userId,
        updatedAt: now.toISOString(),
        updatedByUserId: userId,
        deletedAt: null,
        deletedByUserId: null,
        at: String(args.timestampInput.at),
        episodeId: args.episodeId,
        source: mapGqlTimestampSourceToDbTimestampSource(
          args.timestampInput.source ?? "ANIME_SKIP",
        ),
        typeId: args.timestampInput.typeId,
      };
      const [row] = await ctx.db.insert(timestamps).values(value).returning();
      return mapDbTimestampToGqlTimestamp(row);
    },

    updateTimestamp: async (_parent, args, ctx) => {
      const userId = ctx.authUserId!;
      const now = new Date();
      const updates: Partial<DbTimestampInsert> = {
        updatedAt: now.toISOString(),
        updatedByUserId: userId,
        ...prepareGqlInputForDb(args.newTimestamp),
        source:
          args.newTimestamp.source == null
            ? undefined
            : mapGqlTimestampSourceToDbTimestampSource(
                args.newTimestamp.source,
              ),
        at:
          args.newTimestamp.at == null
            ? undefined
            : String(args.newTimestamp.at),
      };
      const [row] = await ctx.db
        .update(timestamps)
        .set(updates)
        .where(eq(timestamps.id, args.timestampId))
        .returning();
      return mapDbTimestampToGqlTimestamp(row);
    },

    deleteTimestamp: async (_parent, args, ctx) => {
      const userId = ctx.authUserId!;
      const now = new Date();
      const deleted = await ctx.db.transaction(
        (tx) => softDeleteTimestamps(tx, [args.timestampId], userId, now),
        { accessMode: "read write" },
      );
      return mapDbTimestampToGqlTimestamp(deleted);
    },

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
