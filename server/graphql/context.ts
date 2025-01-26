import type { ServerState } from "server/state.ts";
import { createDrizzleDataloader } from "server/utils/db.ts";
import * as tables from "server/db/schema.ts";
import * as mappers from "server/graphql/mappers.ts";
import type { Logger } from "server/utils/logger.ts";

export function createGqlContext(
  state: ServerState,
  logger: Logger,
  // deno-lint-ignore no-explicit-any
  request: any,
) {
  return {
    ...state,
    logger,
    request,
    authUserId: undefined as string | undefined,
    authRole: undefined as tables.DbUserRole | undefined,

    // deno-fmt-ignore
    dataloaders: {
      apiClients:     createDrizzleDataloader(state.db, tables.apiClients,     "id",  mappers.mapDbApiClientToGqlApiClient),
      accounts:       createDrizzleDataloader(state.db, tables.users,          "id",  mappers.mapDbUserToGqlAccount),
      users:          createDrizzleDataloader(state.db, tables.users,          "id",  mappers.mapDbUserToGqlUser),
      userReports:    createDrizzleDataloader(state.db, tables.userReports,    "id",  mappers.mapDbUserReportToGqlUserReport),
      episodeUrls:    createDrizzleDataloader(state.db, tables.episodeUrls,    "url", mappers.mapDbEpisodeUrlToGqlEpisodeUrl),
      episodes:       createDrizzleDataloader(state.db, tables.episodes,       "id",  mappers.mapDbEpisodeToGqlEpisode),
      showAdmins:     createDrizzleDataloader(state.db, tables.showAdmins,     "id",  mappers.mapDbShowAdminToGqlShowAdmin),
      shows:          createDrizzleDataloader(state.db, tables.shows,          "id",  mappers.mapDbShowToGqlShow),
      templates:      createDrizzleDataloader(state.db, tables.templates,      "id",  mappers.mapDbTemplateToGqlTemplate),
      timestampTypes: createDrizzleDataloader(state.db, tables.timestampTypes, "id",  mappers.mapDbTimestampTypeToGqlTimestampType),
      timestamps:     createDrizzleDataloader(state.db, tables.timestamps,     "id",  mappers.mapDbTimestampToGqlTimestamp),
      externalLinks:  createDrizzleDataloader(state.db, tables.externalLinks,  "url", mappers.mapDbExternalLinkToGqlExternalLink),
      preferences: {
        byId:     createDrizzleDataloader(state.db, tables.preferences, "id",     mappers.mapDbPreferencesToGqlPreferences),
        byUserId: createDrizzleDataloader(state.db, tables.preferences, "userId", mappers.mapDbPreferencesToGqlPreferences),
      },
      templateTimestamps: {
        byTemplateIds:  createDrizzleDataloader(state.db, tables.templateTimestamps, "templateId", mappers.mapDbTemplateTimestampToGqlTemplateTimestamp),
        byTimestampIds: createDrizzleDataloader(state.db, tables.templateTimestamps, "timestampId", mappers.mapDbTemplateTimestampToGqlTemplateTimestamp),
      }
    },
  };
}

export type GqlContext = ReturnType<typeof createGqlContext>;
