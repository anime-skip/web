import { openAnimeSkipDatabase } from "server/utils/db.ts";
import { logger } from "server/utils/logger.ts";

export async function createServerState() {
  const port = Number(Deno.env.get("AS_PORT")) || 3000;
  const domain = Deno.env.get("AS_DOMAIN") ?? "localhost";
  const origin = domain === "localhost"
    ? `http://${domain}:${port}`
    : `https://${domain}`;

  const db = await openAnimeSkipDatabase();

  return {
    port,
    domain,
    origin,
    logger,
    db,
  };
}

export type ServerState = Awaited<ReturnType<typeof createServerState>>;
