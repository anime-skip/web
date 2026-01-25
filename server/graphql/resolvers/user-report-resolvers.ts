import type { GqlResolvers } from "server/graphql/resolver-types.gen";
import { and, asc, desc, eq, isNull } from "drizzle-orm";
import type { GqlContext } from "server/graphql/context";
import { type DbUserReportInsert, userReports } from "server/db/schema";
import { mapDbUserReportToGqlUserReport } from "server/graphql/mappers";
import type { NoOptionals } from "shared/types";

export const userReportResolvers: GqlResolvers = {
  Mutation: {
    createUserReport: async (_parent, args, ctx) => {
      if (args.report == null) throw Error("report arg is required");

      const userId = ctx.authUserId!;
      const now = new Date();
      const value: NoOptionals<DbUserReportInsert> = {
        id: crypto.randomUUID(), // TODO: Add default uuid generation so this doesn't need to be passed here'
        createdAt: now.toISOString(),
        createdByUserId: userId,
        updatedAt: now.toISOString(),
        updatedByUserId: userId,
        deletedAt: null,
        deletedByUserId: null,
        episodeId: args.report.episodeId ?? null,
        episodeUrl: args.report.episodeUrl ?? null,
        message: args.report.message,
        reportedFromUrl: args.report.reportedFromUrl,
        resolved: false,
        resolvedMessage: null,
        showId: args.report.showId ?? null,
        timestampId: args.report.timestampId ?? null,
      };
      const [row] = await ctx.db.insert(userReports).values(value).returning();
      return mapDbUserReportToGqlUserReport(row);
    },

    resolveUserReport: async (_parent, args, ctx) => {
      const userId = ctx.authUserId!;
      const now = new Date();
      const updates: Partial<DbUserReportInsert> = {
        updatedAt: now.toISOString(),
        updatedByUserId: userId,
        resolved: true,
        resolvedMessage: args.resolvedMessage,
      };
      const [row] = await ctx.db
        .update(userReports)
        .set(updates)
        .where(eq(userReports.id, args.id))
        .returning();
      return mapDbUserReportToGqlUserReport(row);
    },
  },
  Query: {
    findUserReport: (_parent, args, ctx) =>
      ctx.dataloaders.userReports.load(args.id),

    findUserReports: async (_parent, args, ctx) => {
      const rows = await ctx.db.query.userReports.findMany({
        where: and(
          isNull(userReports.deletedAt),
          args.resolved != null
            ? eq(userReports.resolved, args.resolved)
            : undefined,
        ),
        limit: args.limit,
        offset: args.offset,
        orderBy:
          args.sort === "ASC"
            ? asc(userReports.createdAt)
            : desc(userReports.createdAt),
      });

      return rows.map(mapDbUserReportToGqlUserReport);
    },
  },
  UserReport: {
    createdBy: ({ createdByUserId: id }, _, ctx) =>
      ctx.dataloaders.users.load(id),

    updatedBy: ({ updatedByUserId: id }, _, ctx) =>
      ctx.dataloaders.users.load(id),

    deletedBy: ({ deletedByUserId: id }, _, ctx) =>
      id ? ctx.dataloaders.users.load(id) : null,

    timestamp: (parent, _args, ctx) =>
      parent.timestampId
        ? ctx.dataloaders.timestamps.load(parent.timestampId)
        : null,

    episode: (parent, _args, ctx) =>
      parent.episodeId ? ctx.dataloaders.episodes.load(parent.episodeId) : null,

    episodeUrl: (parent, _args, ctx) =>
      parent.episodeUrlString
        ? ctx.dataloaders.episodeUrls.load(parent.episodeUrlString)
        : null,

    show: (parent, _args, ctx) =>
      parent.showId ? ctx.dataloaders.shows.load(parent.showId) : null,
  },
};

export async function getUserReportsByEpisodeId(
  ctx: GqlContext,
  episodeId: string,
): Promise<GqlUserReport[]> {
  const rows = await ctx.db.query.userReports.findMany({
    where: and(
      eq(userReports.episodeId, episodeId),
      isNull(userReports.deletedAt),
    ),
  });
  return rows.map(mapDbUserReportToGqlUserReport);
}
