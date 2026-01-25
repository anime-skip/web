import type { GqlResolvers } from "server/graphql/resolver-types.gen";
import type { GqlContext } from "server/graphql/context";
import { and, eq, isNull } from "drizzle-orm";
import { type DbTimestampInsert, timestamps } from "server/db/schema";
import {
  mapDbTimestampToGqlTimestamp,
  mapGqlTimestampSourceToDbTimestampSource,
} from "server/graphql/mappers";
import type { NoOptionals } from "shared/types";
import { prepareGqlInputForDb } from "server/utils/drizzle-utils";

function prepareTimestampInsert(
  episodeId: string,
  timestampInput: GqlInputTimestamp,
  userId: string,
  now: Date,
): NoOptionals<Omit<DbTimestampInsert, "id">> {
  return {
    createdAt: now.toISOString(),
    createdByUserId: userId,
    updatedAt: now.toISOString(),
    updatedByUserId: userId,
    deletedAt: null,
    deletedByUserId: null,
    at: String(timestampInput.at),
    episodeId,
    source: mapGqlTimestampSourceToDbTimestampSource(
      timestampInput.source ?? "ANIME_SKIP",
    ),
    typeId: timestampInput.typeId,
  };
}

export const timestampResolvers: GqlResolvers = {
  Mutation: {
    createTimestamp: async (_parent, args, ctx) => {
      const userId = ctx.authUserId!;
      const now = new Date();
      const value = prepareTimestampInsert(
        args.episodeId,
        args.timestampInput,
        userId,
        now,
      );
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
      const [deleted] = await ctx.db.transaction(
        (tx) =>
          ctx.timestampService.softDeleteMany(
            tx,
            [args.timestampId],
            userId,
            now,
          ),
        { accessMode: "read write" },
      );
      if (!deleted) {
        throw new Error(`Timestamp not found: ${args.timestampId}`);
      }
      return mapDbTimestampToGqlTimestamp(deleted);
    },

    updateTimestamps: async (_parent, args, ctx) => {
      const userId = ctx.authUserId!;
      const now = new Date();

      // Prepare create list
      const createList = args.create.map((c) =>
        prepareTimestampInsert(c.episodeId, c.timestamp, userId, now),
      );

      // Prepare update list - fetch existing timestamps first to merge updates
      const updateList: Array<{
        id: string;
        updates: Partial<DbTimestampInsert>;
      }> = [];
      for (const u of args.update) {
        const existing = await ctx.dataloaders.timestamps.load(u.id); // TODO: Optimize with loadMany
        if (!existing) {
          throw new Error(`Timestamp not found: ${u.id}`);
        }
        const updates: Partial<DbTimestampInsert> = {
          ...prepareGqlInputForDb(u.timestamp),
          at:
            u.timestamp.at != null
              ? String(u.timestamp.at)
              : String(existing.at),
          source:
            u.timestamp.source != null
              ? mapGqlTimestampSourceToDbTimestampSource(u.timestamp.source)
              : undefined,
        };
        updateList.push({ id: u.id, updates });
      }

      // Prepare delete list - validate they exist
      const deleteIds: string[] = [];
      for (const id of args.delete) {
        const existing = await ctx.dataloaders.timestamps.load(id); // TODO: Optimize with loadMany
        if (!existing) {
          throw new Error(`Timestamp not found: ${id}`);
        }
        deleteIds.push(id);
      }

      // Execute all operations in a transaction
      const result = await ctx.db.transaction(
        (tx) =>
          ctx.timestampService.updateAll(
            tx,
            createList,
            updateList,
            deleteIds,
            userId,
            now,
          ),
        { accessMode: "read write" },
      );

      return {
        created: result.created.map(mapDbTimestampToGqlTimestamp),
        updated: result.updated.map(mapDbTimestampToGqlTimestamp),
        deleted: result.deleted.map(mapDbTimestampToGqlTimestamp),
      };
    },
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
