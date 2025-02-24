import type { ServerState } from "server/state";
import {
  createDrizzleDataloader,
  type AnimeSkipDatabase,
} from "server/utils/db";
import * as tables from "server/db/schema";
import * as mappers from "server/graphql/mappers";
import type { Logger } from "server/utils/logger";

export function createGqlContext(ctx: {
  logger: Logger;
  request: Request;
  db: AnimeSkipDatabase;
}) {
  const dbUsersDataloader = createDrizzleDataloader(
    ctx.db,
    tables.users,
    "id",
    (v: tables.DbUser) => v,
  );

  return {
    ...ctx,
    logger: ctx.logger.extend("graphql"),
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
        ctx.db,
        tables.apiClients,
        "id",
        mappers.mapDbApiClientToGqlApiClient,
      ),
      userReports: createDrizzleDataloader(
        ctx.db,
        tables.userReports,
        "id",
        mappers.mapDbUserReportToGqlUserReport,
      ),
      episodeUrls: createDrizzleDataloader(
        ctx.db,
        tables.episodeUrls,
        "url",
        mappers.mapDbEpisodeUrlToGqlEpisodeUrl,
      ),
      episodes: createDrizzleDataloader(
        ctx.db,
        tables.episodes,
        "id",
        mappers.mapDbEpisodeToGqlEpisode,
      ),
      showAdmins: createDrizzleDataloader(
        ctx.db,
        tables.showAdmins,
        "id",
        mappers.mapDbShowAdminToGqlShowAdmin,
      ),
      shows: createDrizzleDataloader(
        ctx.db,
        tables.shows,
        "id",
        mappers.mapDbShowToGqlShow,
      ),
      templates: createDrizzleDataloader(
        ctx.db,
        tables.templates,
        "id",
        mappers.mapDbTemplateToGqlTemplate,
      ),
      timestampTypes: createDrizzleDataloader(
        ctx.db,
        tables.timestampTypes,
        "id",
        mappers.mapDbTimestampTypeToGqlTimestampType,
      ),
      timestamps: createDrizzleDataloader(
        ctx.db,
        tables.timestamps,
        "id",
        mappers.mapDbTimestampToGqlTimestamp,
      ),
      externalLinks: createDrizzleDataloader(
        ctx.db,
        tables.externalLinks,
        "url",
        mappers.mapDbExternalLinkToGqlExternalLink,
      ),

      preferences: {
        byId: createDrizzleDataloader(
          ctx.db,
          tables.preferences,
          "id",
          mappers.mapDbPreferencesToGqlPreferences,
        ),
        byUserId: createDrizzleDataloader(
          ctx.db,
          tables.preferences,
          "userId",
          mappers.mapDbPreferencesToGqlPreferences,
        ),
      },
      templateTimestamps: {
        byTemplateIds: createDrizzleDataloader(
          ctx.db,
          tables.templateTimestamps,
          "templateId",
          mappers.mapDbTemplateTimestampToGqlTemplateTimestamp,
        ),
        byTimestampIds: createDrizzleDataloader(
          ctx.db,
          tables.templateTimestamps,
          "timestampId",
          mappers.mapDbTemplateTimestampToGqlTemplateTimestamp,
        ),
      },
    },
  };
}

export type GqlContext = ReturnType<typeof createGqlContext>;
