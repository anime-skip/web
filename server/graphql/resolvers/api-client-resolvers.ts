import type { GqlResolvers } from "server/graphql/resolver-types.gen.ts";
import { randomString, stripNullish, todo } from "shared/utils.ts";
import { asc, desc, eq } from "drizzle-orm";
import { apiClients } from "server/db/schema.ts";
import { mapDbApiClientToGqlApiClient } from "server/graphql/mappers.ts";
import { softDeleteApiClient } from "server/utils/db.ts";
import type { GqlContext } from "server/graphql/context.ts";

export const apiClientResolvers: GqlResolvers = {
  Mutation: {
    createApiClient: async (_parent, args, ctx) => {
      const userId = ctx.authUserId!;
      const now = new Date();
      const [row] = await ctx.db
        .insert(apiClients)
        .values({
          id: randomString(32),
          appName: args.client.appName,
          createdAt: now.toISOString(),
          createdByUserId: userId,
          description: args.client.description,
          rateLimitRpm: 60,
          updatedAt: now.toISOString(),
          updatedByUserId: userId,
          userId,
        })
        .returning();
      return mapDbApiClientToGqlApiClient(row);
    },

    updateApiClient: async (_parent, args, ctx) => {
      const userId = ctx.authUserId!;
      const now = new Date();
      const [row] = await ctx.db
        .update(apiClients)
        .set({
          updatedAt: now.toISOString(),
          updatedByUserId: userId,
          ...stripNullish(args.changes),
        })
        .where(eq(apiClients.id, args.id))
        .returning();
      return mapDbApiClientToGqlApiClient(row);
    },

    deleteApiClient: async (_parent, args, ctx) => {
      const userId = ctx.authUserId!;
      const now = new Date();
      const deleted = await ctx.db.transaction(
        (tx) => softDeleteApiClient(tx, args.id, userId, now),
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
    where: eq(apiClients.userId, userId),
    offset: options.offset,
    limit: options.limit,
    orderBy: (options.sort === "ASC" ? asc : desc)(apiClients.createdAt),
  });
  return rows.map(mapDbApiClientToGqlApiClient);
}
