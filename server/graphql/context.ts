import type { ServerState } from "server/state";
import { createDrizzleDataloader } from "server/utils/db";
import * as tables from "server/db/schema";
import * as mappers from "server/graphql/mappers";
import type { RouterContext } from "@oak/oak/router";

export function createGqlContext(
  ctx: RouterContext<"/graphql", {}, ServerState>,
) {
  const dbUsersDataloader = createDrizzleDataloader(
    ctx.state.db,
    tables.users,
    "id",
    (v: tables.DbUser) => v,
  );

  return {
    ...ctx.state,
    logger: ctx.state.logger.extend("graphql"),
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
        ctx.state.db,
        tables.apiClients,
        "id",
        mappers.mapDbApiClientToGqlApiClient,
      ),
      userReports: createDrizzleDataloader(
        ctx.state.db,
        tables.userReports,
        "id",
        mappers.mapDbUserReportToGqlUserReport,
      ),
      episodeUrls: createDrizzleDataloader(
        ctx.state.db,
        tables.episodeUrls,
        "url",
        mappers.mapDbEpisodeUrlToGqlEpisodeUrl,
      ),
      episodes: createDrizzleDataloader(
        ctx.state.db,
        tables.episodes,
        "id",
        mappers.mapDbEpisodeToGqlEpisode,
      ),
      showAdmins: createDrizzleDataloader(
        ctx.state.db,
        tables.showAdmins,
        "id",
        mappers.mapDbShowAdminToGqlShowAdmin,
      ),
      shows: createDrizzleDataloader(
        ctx.state.db,
        tables.shows,
        "id",
        mappers.mapDbShowToGqlShow,
      ),
      templates: createDrizzleDataloader(
        ctx.state.db,
        tables.templates,
        "id",
        mappers.mapDbTemplateToGqlTemplate,
      ),
      timestampTypes: createDrizzleDataloader(
        ctx.state.db,
        tables.timestampTypes,
        "id",
        mappers.mapDbTimestampTypeToGqlTimestampType,
      ),
      timestamps: createDrizzleDataloader(
        ctx.state.db,
        tables.timestamps,
        "id",
        mappers.mapDbTimestampToGqlTimestamp,
      ),
      externalLinks: createDrizzleDataloader(
        ctx.state.db,
        tables.externalLinks,
        "url",
        mappers.mapDbExternalLinkToGqlExternalLink,
      ),

      preferences: {
        byId: createDrizzleDataloader(
          ctx.state.db,
          tables.preferences,
          "id",
          mappers.mapDbPreferencesToGqlPreferences,
        ),
        byUserId: createDrizzleDataloader(
          ctx.state.db,
          tables.preferences,
          "userId",
          mappers.mapDbPreferencesToGqlPreferences,
        ),
      },
      templateTimestamps: {
        byTemplateIds: createDrizzleDataloader(
          ctx.state.db,
          tables.templateTimestamps,
          "templateId",
          mappers.mapDbTemplateTimestampToGqlTemplateTimestamp,
        ),
        byTimestampIds: createDrizzleDataloader(
          ctx.state.db,
          tables.templateTimestamps,
          "timestampId",
          mappers.mapDbTemplateTimestampToGqlTemplateTimestamp,
        ),
      },
    },
  };
}

export type GqlContext = ReturnType<typeof createGqlContext>;
