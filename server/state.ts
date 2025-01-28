import { openAnimeSkipDatabase } from "server/utils/db";
import { logger } from "server/utils/logger";
import type { DbApiClient } from "server/db/schema";

export async function createServerState() {
  const port = Number(import.meta.env.AS_PORT) || 3000;
  const domain = import.meta.env.AS_DOMAIN ?? "localhost";
  const origin =
    domain === "localhost" ? `http://${domain}:${port}` : `https://${domain}`;

  const db = await openAnimeSkipDatabase();

  return {
    port,
    domain,
    origin,
    db,
    logger,
    apiClient: null! as DbApiClient,
    requestId: null! as string,
    ipAddress: null! as string,
  };
}

export type ServerState = Awaited<ReturnType<typeof createServerState>>;
