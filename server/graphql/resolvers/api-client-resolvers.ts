import type { GqlResolvers } from "server/graphql/resolver-types.gen";
import { randomString } from "shared/utils";
import { and, asc, desc, eq, isNull } from "drizzle-orm";
import { apiClients, type DbApiClientInsert } from "server/db/schema";
import { mapDbApiClientToGqlApiClient } from "server/graphql/mappers";
import { prepareGqlInputForDb, softDeleteApiClients } from "server/utils/db";
import type { GqlContext } from "server/graphql/context";
import type { NoOptionals } from "shared/types";

export const apiClientResolvers: GqlResolvers = {
  Mutation: {
    createApiClient: async (_parent, args, ctx) => {
      const userId = ctx.authUserId!;
      const now = new Date();
      const value: NoOptionals<DbApiClientInsert> = {
        id: randomString(32),
        userId,
        appName: args.client.appName,
        createdAt: now.toISOString(),
        createdByUserId: userId,
        description: args.client.description,
        rateLimitRpm: 60,
        updatedAt: now.toISOString(),
        updatedByUserId: userId,
        allowedOrigins: null,
        deletedAt: null,
        deletedByUserId: null,
      };
      const [row] = await ctx.db.insert(apiClients).values(value).returning();
      return mapDbApiClientToGqlApiClient(row);
    },

    updateApiClient: async (_parent, args, ctx) => {
      const userId = ctx.authUserId!;
      const now = new Date();
      const updates: Partial<DbApiClientInsert> = {
        updatedAt: now.toISOString(),
        updatedByUserId: userId,
        ...prepareGqlInputForDb(args.changes),
      };
      const [row] = await ctx.db
        .update(apiClients)
        .set(updates)
        .where(eq(apiClients.id, args.id))
        .returning();
      return mapDbApiClientToGqlApiClient(row);
    },

    deleteApiClient: async (_parent, args, ctx) => {
      const userId = ctx.authUserId!;
      const now = new Date();
      const deleted = await ctx.db.transaction(
        (tx) => softDeleteApiClients(tx, [args.id], userId, now),
        { accessMode: "read write" },
      );
      return mapDbApiClientToGqlApiClient(deleted);
    },
  },
  Query: {
    findApiClient: (_parent, args, ctx) =>
      ctx.dataloaders.apiClients.load(args.id),

    myApiClients: (_parent, args, ctx) =>
      getApiClientsByUserId(ctx, ctx.authUserId!, args),
  },
  ApiClient: {
    createdBy: ({ createdByUserId: id }, _, ctx) =>
      ctx.dataloaders.users.load(id),

    updatedBy: ({ updatedByUserId: id }, _, ctx) =>
      ctx.dataloaders.users.load(id),

    deletedBy: ({ deletedByUserId: id }, _, ctx) =>
      id ? ctx.dataloaders.users.load(id) : null,
  },
};

export async function getApiClientsByUserId(
  ctx: GqlContext,
  userId: string,
  options: {
    limit: number;
    offset: number;
    sort: string;
  },
): Promise<GqlApiClient[]> {
  const rows = await ctx.db.query.apiClients.findMany({
    where: and(eq(apiClients.userId, userId), isNull(apiClients.deletedAt)),
    offset: options.offset,
    limit: options.limit,
    orderBy: (options.sort === "ASC" ? asc : desc)(apiClients.createdAt),
  });
  return rows.map(mapDbApiClientToGqlApiClient);
}
