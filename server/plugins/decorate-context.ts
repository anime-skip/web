import Elysia from "elysia";
import { openAnimeSkipDatabase } from "server/utils/db";
import { logger } from "server/utils/logger";
import { createThirdPartyService } from "server/utils/third-party-service";
import { version } from "shared/app";

const db = await openAnimeSkipDatabase();
const thirdPartyService = createThirdPartyService(db);

export const decorateContext = new Elysia({ name: "decorate-context" })
  .decorate({
    db,
    thirdPartyService,
    logger,
    version,
  })
  .as("plugin");
