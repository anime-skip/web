import type { GqlResolvers } from "server/graphql/resolver-types.gen";
import { todo } from "shared/utils";
import { getEpisodesByShowId } from "server/graphql/resolvers/episode-resolvers";
import { getShowAdminsByShowId } from "server/graphql/resolvers/show-admin-resolvers";
import { getTemplatesByShowId } from "server/graphql/resolvers/template-resolvers";
import type { NoOptionals } from "shared/types";
import { mapDbShowToGqlShow } from "server/graphql/mappers";
import { type DbShowInsert, shows } from "server/db/schema";
import { prepareGqlInputForDb } from "server/utils/drizzle-utils";
import { eq } from "drizzle-orm";

export const showResolvers: GqlResolvers = {
  Mutation: {
    createShow: async (_parent, args, ctx) => {
      const userId = ctx.authUserId!;
      const now = new Date();
      const value: NoOptionals<Omit<DbShowInsert, "id">> = {
        createdAt: now.toISOString(),
        createdByUserId: userId,
        updatedAt: now.toISOString(),
        updatedByUserId: userId,
        deletedAt: null,
        deletedByUserId: null,
        image: args.showInput.image ?? null,
        name: args.showInput.name,
        originalName: args.showInput.originalName ?? null,
        website: args.showInput.website ?? null,
      };
      const [row] = await ctx.db.insert(shows).values(value).returning();

      if (args.becomeAdmin) todo("createShow > args.becomeAdmin");

      return mapDbShowToGqlShow(row);
    },

    updateShow: async (_parent, args, ctx) => {
      const userId = ctx.authUserId!;
      const now = new Date();
      const updates: Partial<DbShowInsert> = {
        updatedAt: now.toISOString(),
        updatedByUserId: userId,
        ...prepareGqlInputForDb(args.newShow),
      };
      const [row] = await ctx.db
        .update(shows)
        .set(updates)
        .where(eq(shows.id, args.showId))
        .returning();
      return mapDbShowToGqlShow(row);
    },

    deleteShow: async (_parent, args, ctx) => {
      const userId = ctx.authUserId!;
      const now = new Date();
      const deleted = await ctx.db.transaction(
        (tx) => ctx.showService.softDeleteMany(tx, [args.showId], userId, now),
        { accessMode: "read write" },
      );
      return mapDbShowToGqlShow(deleted);
    },
  },
  Query: {
    findShow: (_parent, args, ctx) => ctx.dataloaders.shows.load(args.showId),

    findShowsByExternalId: (_parent, _args, _ctx) => todo(),

    searchShows: (_parent, _args, _ctx) => todo(),
  },
  Show: {
    createdBy: ({ createdByUserId: id }, _, ctx) =>
      ctx.dataloaders.users.load(id),

    updatedBy: ({ updatedByUserId: id }, _, ctx) =>
      ctx.dataloaders.users.load(id),

    deletedBy: ({ deletedByUserId: id }, _, ctx) =>
      id ? ctx.dataloaders.users.load(id) : null,

    admins: (parent, _args, ctx) => getShowAdminsByShowId(ctx, parent.id),

    episodes: (parent, _args, ctx) => getEpisodesByShowId(ctx, parent.id),

    templates: (parent, _args, ctx) => getTemplatesByShowId(ctx, parent.id),

    externalLinks: (_parent, _args, _ctx) => todo(),

    seasonCount: (_parent, _args, _ctx) => todo(),

    episodeCount: (_parent, _args, _ctx) => todo(),
  },
};
