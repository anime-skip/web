import Elysia from "elysia";
import { openAnimeSkipDatabase } from "server/utils/db";
import { logger } from "server/utils/logger";
import { createThirdPartyService } from "server/utils/third-party-service";
import { version } from "shared/app";
import { createIocContainer } from "@aklinker1/zero-ioc";

const db = await openAnimeSkipDatabase();
const container = createIocContainer()
  .register({
    db: () => db,
  })
  .register({
    thirdPartyService: createThirdPartyService,
  });

export const decorateContext = new Elysia({ name: "decorate-context" })
  .decorate({
    logger,
    version,
  })
  .decorate(container.resolveAll())
  .as("plugin");
