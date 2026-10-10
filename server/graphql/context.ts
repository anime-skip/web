import * as tables from "server/db/schema";
import type { Dependencies } from "server/dependencies";
import * as mappers from "server/graphql/mappers";
import { createDrizzleDataloader } from "server/utils/drizzle-utils";

export function createGqlContext(ctx: { deps: Dependencies; request: Request; ip: string }) {
  const dbUsersDataloader = createDrizzleDataloader(
    ctx.deps.db,
    tables.users,
    "id",
    (v: tables.DbUser) => v,
  );

  return {
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

      apiClients: createDrizzleDataloader(
        ctx.deps.db,
        tables.apiClients,
        "id",
        mappers.mapDbApiClientToGqlApiClient,
      ),
      userReports: createDrizzleDataloader(
        ctx.deps.db,
        tables.userReports,
        "id",
        mappers.mapDbUserReportToGqlUserReport,
      ),
      episodeUrls: createDrizzleDataloader(
        ctx.deps.db,
        tables.episodeUrls,
        "url",
        mappers.mapDbEpisodeUrlToGqlEpisodeUrl,
      ),
      episodes: createDrizzleDataloader(
        ctx.deps.db,
        tables.episodes,
        "id",
        mappers.mapDbEpisodeToGqlEpisode,
      ),

      shows: createDrizzleDataloader(
        ctx.deps.db,
        tables.shows,
        "id",
        mappers.mapDbShowToGqlShow,
      ),
      templates: createDrizzleDataloader(
        ctx.deps.db,
        tables.templates,
        "id",
        mappers.mapDbTemplateToGqlTemplate,
      ),
      timestampTypes: createDrizzleDataloader(
        ctx.deps.db,
        tables.timestampTypes,
        "id",
        mappers.mapDbTimestampTypeToGqlTimestampType,
      ),
      timestamps: createDrizzleDataloader(
        ctx.deps.db,
        tables.timestamps,
        "id",
        mappers.mapDbTimestampToGqlTimestamp,
      ),
      externalLinks: createDrizzleDataloader(
        ctx.deps.db,
        tables.externalLinks,
        "url",
        mappers.mapDbExternalLinkToGqlExternalLink,
      ),

      preferences: {
        byId: createDrizzleDataloader(
          ctx.deps.db,
          tables.preferences,
          "id",
          mappers.mapDbPreferencesToGqlPreferences,
        ),
        byUserId: createDrizzleDataloader(
          ctx.deps.db,
          tables.preferences,
          "userId",
          mappers.mapDbPreferencesToGqlPreferences,
        ),
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
}

export type GqlContext = ReturnType<typeof createGqlContext>;
