import { logger } from "server/utils/logger";
import { openAnimeSkipDatabase } from "server/services/db";
import { createIocContainer } from "@aklinker1/zero-ioc";
import { createApiClientService } from "./services/api-client-service";
import { createUserService } from "./services/user-service";
import { createEpisodeUrlService } from "./services/episode-url-service";
import { createExternalLinkService } from "./services/external-link-service";
import { createPreferencesService } from "./services/preferences-service";
import { createShowAdminService } from "./services/show-admin-service";
import { createShowService } from "./services/show-service";
import { createTemplateService } from "./services/template-service";
import { createTemplateTimestampService } from "./services/template-timestamp-service";
import { createTimestampService } from "./services/timestamp-service";
import { createTimestampTypeService } from "./services/timestamp-type-service";
import { createUserReportService } from "./services/user-report-service";
import { createEpisodeService } from "./services/episode-service";
import { createAggregateThirdPartyService } from "./services/aggregate-third-party-service";
import { createDbThirdPartyService } from "./services/db-third-party-service";

const db = await openAnimeSkipDatabase();

export const container = createIocContainer()
  .register({ db: () => db })
  .register({ logger: () => logger })
  .register({ apiClientService: createApiClientService })
  .register({ episodeUrlService: createEpisodeUrlService })
  .register({ externalLinkService: createExternalLinkService })
  .register({ preferencesService: createPreferencesService })
  .register({ showAdminService: createShowAdminService })
  .register({ templateTimestampService: createTemplateTimestampService })
  .register({ timestampTypeService: createTimestampTypeService })
  .register({ userReportService: createUserReportService })
  .register({ userService: createUserService })
  .register({ templateService: createTemplateService })
  .register({ timestampService: createTimestampService })
  .register({ episodeService: createEpisodeService })
  .register({ showService: createShowService })
  .register({
    thirdPartyService: (deps) =>
      createAggregateThirdPartyService({
        ...deps,
        services: {
          Db: createDbThirdPartyService(deps),
        },
      }),
  });

export type Dependencies = ReturnType<typeof container.resolveAll>;
