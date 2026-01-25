import type { GqlResolvers } from "server/graphql/resolver-types.gen";
import type { GqlContext } from "server/graphql/context";
import { type DbShowAdminInsert, showAdmins } from "server/db/schema";
import { and, eq, isNull } from "drizzle-orm";
import { mapDbShowAdminToGqlShowAdmin } from "server/graphql/mappers";
import type { NoOptionals } from "shared/types";

export const showAdminResolvers: GqlResolvers = {
  Mutation: {
    createShowAdmin: async (_parent, args, ctx) => {
      const userId = ctx.authUserId!;
      const now = new Date();
      const value: NoOptionals<Omit<DbShowAdminInsert, "id">> = {
        createdAt: now.toISOString(),
        createdByUserId: userId,
        updatedAt: now.toISOString(),
        updatedByUserId: userId,
        showId: args.showAdminInput.showId,
        userId: args.showAdminInput.userId,
        deletedAt: null,
        deletedByUserId: null,
      };
      const [row] = await ctx.db.insert(showAdmins).values(value).returning();
      return mapDbShowAdminToGqlShowAdmin(row);
    },

    deleteShowAdmin: async (_parent, args, ctx) => {
      const userId = ctx.authUserId!;
      const now = new Date();
      const [deleted] = await ctx.db.transaction(
        (tx) =>
          ctx.showAdminService.softDeleteMany(
            tx,
            [args.showAdminId],
            userId,
            now,
          ),
        { accessMode: "read write" },
      );
      if (!deleted) {
        throw new Error(`Show admin not found: ${args.showAdminId}`);
      }
      return mapDbShowAdminToGqlShowAdmin(deleted);
    },
  },
  Query: {
    findShowAdmin: (_parent, args, ctx) =>
      ctx.dataloaders.showAdmins.load(args.showAdminId),

    findShowAdminsByShowId: (_parent, args, ctx) =>
      getShowAdminsByShowId(ctx, args.showId),

    findShowAdminsByUserId: (_parent, args, ctx) =>
      getShowAdminsByUserId(ctx, args.userId),
  },
  ShowAdmin: {
    createdBy: ({ createdByUserId: id }, _, ctx) =>
      ctx.dataloaders.users.load(id),

    updatedBy: ({ updatedByUserId: id }, _, ctx) =>
      ctx.dataloaders.users.load(id),

    deletedBy: ({ deletedByUserId: id }, _, ctx) =>
      id ? ctx.dataloaders.users.load(id) : null,

    show: (parent, _args, ctx) => ctx.dataloaders.shows.load(parent.showId),

    user: (parent, _args, ctx) => ctx.dataloaders.users.load(parent.userId),
  },
};

export async function getShowAdminsByUserId(
  ctx: GqlContext,
  userId: string,
): Promise<GqlShowAdmin[]> {
  const rows = await ctx.db.query.showAdmins.findMany({
    where: and(eq(showAdmins.userId, userId), isNull(showAdmins.deletedAt)),
  });
  return rows.map(mapDbShowAdminToGqlShowAdmin);
}

export async function getShowAdminsByShowId(
  ctx: GqlContext,
  showId: string,
): Promise<GqlShowAdmin[]> {
  const rows = await ctx.db.query.showAdmins.findMany({
    where: and(eq(showAdmins.showId, showId), isNull(showAdmins.deletedAt)),
  });
  return rows.map(mapDbShowAdminToGqlShowAdmin);
}
