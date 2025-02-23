import { openAnimeSkipDatabase } from "server/utils/db";
import { logger } from "server/utils/logger";
import type { DbApiClient } from "server/db/schema";
import { createThirdPartyService } from "./utils/third-party-service";

export async function createServerState() {
  const db = await openAnimeSkipDatabase();
  const thirdPartyService = createThirdPartyService(db);

  return {
    db,
    logger,
    thirdPartyService,

    // Filled out by middleware
    apiClient: null! as DbApiClient,
    requestId: null! as string,
    ipAddress: null! as string,
  };
}

export type ServerState = Awaited<ReturnType<typeof createServerState>>;
