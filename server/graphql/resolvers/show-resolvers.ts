import type { GqlResolvers } from "server/graphql/resolver-types.gen";
import { notImplemented } from "shared/utils";
import { getEpisodesByShowId } from "server/graphql/resolvers/episode-resolvers";
import { getShowAdminsByShowId } from "server/graphql/resolvers/show-admin-resolvers";
import { getTemplatesByShowId } from "server/graphql/resolvers/template-resolvers";
import { getExternalLinksByShowId } from "server/graphql/resolvers/external-link-resolvers";
import type { NoOptionals } from "shared/types";
import { mapDbShowToGqlShow } from "server/graphql/mappers";
import {
  type DbShowInsert,
  episodes,
  externalLinks,
  shows,
} from "server/db/schema";
import { prepareGqlInputForDb } from "server/utils/drizzle-utils";
import {
  and,
  asc,
  desc,
  eq,
  ilike,
  isNull,
  sql,
  type SQLWrapper,
} from "drizzle-orm";

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

      if (args.becomeAdmin) notImplemented("createShow > args.becomeAdmin");

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
      const [deleted] = await ctx.db.transaction(
        (tx) => ctx.showService.softDeleteMany(tx, [args.showId], userId, now),
        { accessMode: "read write" },
      );
      if (!deleted) {
        throw new Error(`Show not found: ${args.showId}`);
      }
      return mapDbShowToGqlShow(deleted);
    },
  },
  Query: {
    findShow: (_parent, args, ctx) => ctx.dataloaders.shows.load(args.showId),

    findShowsByExternalId: async (_parent, args, ctx) => {
      const urlPattern = getServiceUrlPattern(args.service, args.serviceId);

      const links = await ctx.db.query.externalLinks.findMany({
        where: ilike(externalLinks.url, urlPattern),
      });
      if (links.length === 0) return [];

      const showIds = [...new Set(links.map((link) => link.showId))];
      return await Promise.all(
        showIds.map((id) => ctx.dataloaders.shows.load(id)),
      );
    },

    searchShows: async (_parent, args, ctx) => {
      const where: SQLWrapper[] = [isNull(shows.deletedAt)];

      if (args.search) {
        where.push(ilike(shows.name, `%${args.search.trim()}%`));
      }

      const res = await ctx.db.query.shows.findMany({
        where: and(...where),
        limit: args.limit,
        offset: args.offset,
        orderBy: args.sort === "ASC" ? asc(shows.name) : desc(shows.name),
      });

      return res.map(mapDbShowToGqlShow);
    },
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

    externalLinks: (parent, _args, ctx) =>
      getExternalLinksByShowId(ctx, parent.id),

    seasonCount: async (parent, _args, ctx) => {
      const [{ count }] = await ctx.db
        .select({ count: sql<number>`COUNT(DISTINCT season)` })
        .from(episodes)
        .where(and(eq(episodes.showId, parent.id), isNull(episodes.deletedAt)));
      return count;
    },

    episodeCount: async (parent, _args, ctx) => {
      return await ctx.db.$count(
        episodes,
        and(eq(episodes.showId, parent.id), isNull(episodes.deletedAt)),
      );
    },
  },
};

/**
 * Returns a SQL ILIKE pattern for matching external link URLs by service and service ID.
 */
function getServiceUrlPattern(
  service: GqlExternalService,
  serviceId: string,
): string {
  switch (service) {
    case "ANILIST":
      // Match URLs like https://anilist.co/anime/12345 or https://anilist.co/anime/12345/some-slug
      return `https://anilist.co/%/${serviceId}%`;
    default:
      throw new Error(`Unknown external service: ${service}`);
  }
}
