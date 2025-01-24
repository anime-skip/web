import {
  createDrizzleDataloader,
  openAnimeSkipDatabase,
} from "server/utils/db.ts";
import { users } from "server/db/schema.ts";
import { logger } from "server/utils/logger.ts";

export async function createServerState() {
  const port = Number(Deno.env.get("AS_PORT")) || 3000;
  const domain = Deno.env.get("AS_DOMAIN") ?? "localhost";
  const origin = domain === "localhost"
    ? `http://${domain}:${port}`
    : `https://${domain}`;

  const db = await openAnimeSkipDatabase();
  const usersDataloader = createDrizzleDataloader(db, users);

  return {
    port,
    domain,
    origin,
    logger,
    db,
    usersDataloader,
  };
}

export type ServerState = Awaited<ReturnType<typeof createServerState>>;
