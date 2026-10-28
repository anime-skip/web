import { and, asc, desc, eq, isNull, type SQL } from "drizzle-orm";
import type { PgTableWithColumns } from "drizzle-orm/pg-core";
import * as tables from "server/db/schema";
import type { Dependencies } from "server/dependencies";
import * as mappers from "server/graphql/mappers";
import { createDrizzleDataloader, unwrapOne } from "server/utils/drizzle-utils";

export function createGqlContext(ctx: { deps: Dependencies; request: Request; ip: string }) {
  /** Loads a single row by a unique column, failing if it doesn't exist. */
  const byUnique = <DbModel, GqlModel>(
    // oxlint-lint-ignore no-explicit-any
    table: PgTableWithColumns<any>,
    key: keyof DbModel,
    mapper: (db: DbModel) => GqlModel,
  ) => unwrapOne(createDrizzleDataloader(ctx.deps.db, table, key, mapper), key);

  const dbUsersDataloader = byUnique(tables.users, "id", (v: tables.DbUser) => v);

  // Declared up front (and assigned below) so the dataloaders can read `authUserId` lazily without
  // making the context's inferred type circular.
  let getAuthUserId: () => string | undefined = () => undefined;

  const context = {
    ...ctx,
    request: ctx.request,
    authUserId: undefined as string | undefined,
    authRole: undefined as tables.DbUserRole | undefined,

    // prettier-ignore
    dataloaders: {
      dbUsers: dbUsersDataloader,
      accounts: {
        load: (key: string) =>
          dbUsersDataloader.load(key).then(mappers.mapDbUserToGqlAccount),
      },
      users: {
        load: (key: string) =>
          dbUsersDataloader.load(key).then(mappers.mapDbUserToGqlUser),
      },

      apiClients: byUnique(tables.apiClients, "id", mappers.mapDbApiClientToGqlApiClient),
      userReports: byUnique(tables.userReports, "id", mappers.mapDbUserReportToGqlUserReport),
      episodeUrls: byUnique(tables.episodeUrls, "url", mappers.mapDbEpisodeUrlToGqlEpisodeUrl),
      episodes: byUnique(tables.episodes, "id", mappers.mapDbEpisodeToGqlEpisode),
      shows: byUnique(tables.shows, "id", mappers.mapDbShowToGqlShow),
      templates: byUnique(tables.templates, "id", mappers.mapDbTemplateToGqlTemplate),
      timestampTypes: byUnique(tables.timestampTypes, "id", mappers.mapDbTimestampTypeToGqlTimestampType),
      timestamps: byUnique(tables.timestamps, "id", mappers.mapDbTimestampToGqlTimestamp),
      externalLinks: byUnique(tables.externalLinks, "url", mappers.mapDbExternalLinkToGqlExternalLink),
      // Returns raw DB rows so callers can sort before mapping.
      dbEpisodesByShowId: createDrizzleDataloader(
        ctx.deps.db,
        tables.episodes,
        "showId",
        (v: tables.DbEpisode) => v,
        { where: isNull(tables.episodes.deletedAt) },
      ),
      timestampsByEpisodeId: createDrizzleDataloader(
        ctx.deps.db,
        tables.timestamps,
        "episodeId",
        mappers.mapDbTimestampToGqlTimestamp,
        { where: isNull(tables.timestamps.deletedAt), orderBy: asc(tables.timestamps.at) },
      ),
      episodeUrlsByEpisodeId: createDrizzleDataloader(
        ctx.deps.db,
        tables.episodeUrls,
        "episodeId",
        mappers.mapDbEpisodeUrlToGqlEpisodeUrl,
        { orderBy: asc(tables.episodeUrls.createdAt) },
      ),
      userReportsByEpisodeId: createDrizzleDataloader(
        ctx.deps.db,
        tables.userReports,
        "episodeId",
        mappers.mapDbUserReportToGqlUserReport,
        { where: isNull(tables.userReports.deletedAt), orderBy: asc(tables.userReports.createdAt) },
      ),
      // Newest first; the resolver takes the first template per episode.
      templatesBySourceEpisodeId: createDrizzleDataloader(
        ctx.deps.db,
        tables.templates,
        "sourceEpisodeId",
        mappers.mapDbTemplateToGqlTemplate,
        {
          where: (): SQL | undefined =>
            and(
              isNull(tables.templates.deletedAt),
              getAuthUserId() ? eq(tables.templates.createdByUserId, getAuthUserId()!) : undefined,
            ),
          orderBy: desc(tables.templates.createdAt),
        },
      ),
      preferences: {
        byId: byUnique(tables.preferences, "id", mappers.mapDbPreferencesToGqlPreferences),
        byUserId: byUnique(tables.preferences, "userId", mappers.mapDbPreferencesToGqlPreferences),
      },
      templateTimestamps: {
        byTemplateIds: createDrizzleDataloader(
          ctx.deps.db,
          tables.templateTimestamps,
          "templateId",
          mappers.mapDbTemplateTimestampToGqlTemplateTimestamp,
        ),
        byTimestampIds: createDrizzleDataloader(
          ctx.deps.db,
          tables.templateTimestamps,
          "timestampId",
          mappers.mapDbTemplateTimestampToGqlTemplateTimestamp,
        ),
      },
    },
  };
  getAuthUserId = () => context.authUserId;
  return context;
}

export type GqlContext = ReturnType<typeof createGqlContext>;
