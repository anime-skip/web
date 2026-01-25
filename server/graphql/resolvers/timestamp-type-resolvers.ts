import type { GqlResolvers } from "server/graphql/resolver-types.gen";
import { mapDbTimestampTypeToGqlTimestampType } from "server/graphql/mappers";
import type { NoOptionals } from "shared/types";
import { type DbTimestampTypeInsert, timestampTypes } from "server/db/schema";
import { prepareGqlInputForDb } from "server/utils/drizzle-utils";
import { eq } from "drizzle-orm";

export const timestampTypeResolvers: GqlResolvers = {
  Mutation: {
    createTimestampType: async (_parent, args, ctx) => {
      const userId = ctx.authUserId!;
      const now = new Date();
      const value: NoOptionals<Omit<DbTimestampTypeInsert, "id">> = {
        createdAt: now.toISOString(),
        createdByUserId: userId,
        updatedAt: now.toISOString(),
        updatedByUserId: userId,
        deletedAt: null,
        deletedByUserId: null,
        description: args.timestampTypeInput.description,
        name: args.timestampTypeInput.name,
      };
      const [row] = await ctx.db
        .insert(timestampTypes)
        .values(value)
        .returning();
      return mapDbTimestampTypeToGqlTimestampType(row);
    },

    updateTimestampType: async (_parent, args, ctx) => {
      const userId = ctx.authUserId!;
      const now = new Date();
      const updates: Partial<DbTimestampTypeInsert> = {
        updatedAt: now.toISOString(),
        updatedByUserId: userId,
        ...prepareGqlInputForDb(args.newTimestampType),
      };
      const [row] = await ctx.db
        .update(timestampTypes)
        .set(updates)
        .where(eq(timestampTypes.id, args.timestampTypeId))
        .returning();
      return mapDbTimestampTypeToGqlTimestampType(row);
    },

    deleteTimestampType: async (_parent, args, ctx) => {
      const userId = ctx.authUserId!;
      const now = new Date();
      const deleted = await ctx.db.transaction(
        (tx) =>
          ctx.timestampTypeService.softDeleteMany(
            tx,
            [args.timestampTypeId],
            userId,
            now,
          ),
        { accessMode: "read write" },
      );
      return mapDbTimestampTypeToGqlTimestampType(deleted);
    },
  },
  Query: {
    findTimestampType: (_parent, args, ctx) =>
      ctx.dataloaders.timestampTypes.load(args.timestampTypeId),

    allTimestampTypes: async (_parent, _args, ctx) => {
      const rows = await ctx.db.query.timestampTypes.findMany();
      return rows.map(mapDbTimestampTypeToGqlTimestampType);
    },
  },
  TimestampType: {
    createdBy: ({ createdByUserId: id }, _, ctx) =>
      ctx.dataloaders.users.load(id),

    updatedBy: ({ updatedByUserId: id }, _, ctx) =>
      ctx.dataloaders.users.load(id),

    deletedBy: ({ deletedByUserId: id }, _, ctx) =>
      id ? ctx.dataloaders.users.load(id) : null,
  },
};
