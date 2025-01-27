import type { GqlResolvers } from "server/graphql/resolver-types.gen.ts";
import { todo } from "shared/utils.ts";
import type { GqlContext } from "server/graphql/context.ts";
import { showAdmins } from "server/db/schema.ts";
import { and, eq, isNull } from "drizzle-orm";
import { mapDbShowAdminToGqlShowAdmin } from "server/graphql/mappers.ts";

export const showAdminResolvers: GqlResolvers = {
  Mutation: {
    createShowAdmin: (_parent, _args, _ctx) => todo(),

    deleteShowAdmin: (_parent, _args, _ctx) => todo(),
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
    where: and(
      eq(showAdmins.userId, userId),
      isNull(showAdmins.deletedAt),
    ),
  });
  return rows.map(mapDbShowAdminToGqlShowAdmin);
}

export async function getShowAdminsByShowId(
  ctx: GqlContext,
  showId: string,
): Promise<GqlShowAdmin[]> {
  const rows = await ctx.db.query.showAdmins.findMany({
    where: and(
      eq(showAdmins.showId, showId),
      isNull(showAdmins.deletedAt),
    ),
  });
  return rows.map(mapDbShowAdminToGqlShowAdmin);
}
