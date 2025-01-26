import type { GqlResolvers } from "server/graphql/resolver-types.gen.ts";
import { todo } from "shared/utils.ts";
import { asc, desc, eq } from "drizzle-orm";
import { apiClients } from "server/db/schema.ts";
import { mapDbApiClientToGqlApiClient } from "server/graphql/mappers.ts";

export const apiClientResolvers: GqlResolvers = {
  Mutation: {
    createApiClient: async (_parent, args, ctx) => {
      const userId = ctx.authUserId!;
    },

    updateApiClient: async (_parent, args, ctx) => {
      todo();
    },

    deleteApiClient: async (_parent, args, ctx) => {
      todo();
    },
  },
  Query: {
    findApiClient: (_parent, args, ctx) =>
      ctx.dataloaders.apiClients.load(args.id),

    myApiClients: async (_parent, args, ctx) => {
      const userId = ctx.authUserId!;

      const rows = await ctx.db.query.apiClients.findMany({
        where: eq(apiClients.userId, userId),
        offset: args.offset,
        limit: args.limit,
        orderBy: (args.sort === "ASC" ? asc : desc)(apiClients.createdAt),
      });
      return rows.map(mapDbApiClientToGqlApiClient);
    },
  },
  ApiClient: {
    createdBy: ({ createdByUserId: id }, _, ctx) =>
      ctx.dataloaders.users.load(id),

    updatedBy: ({ updatedByUserId: id }, _, ctx) =>
      ctx.dataloaders.users.load(id),

    deletedBy: ({ deletedByUserId: id }, _, ctx) =>
      id == null ? null : ctx.dataloaders.users.load(id),
  },
};
