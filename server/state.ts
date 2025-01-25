import {
  createDrizzleDataloader,
  openAnimeSkipDatabase,
} from "server/utils/db.ts";
import { apiClients, preferences, users } from "server/db/schema.ts";
import { logger } from "server/utils/logger.ts";
import {
  mapDbPreferencesToGqlPreferences,
  mapDbUserToGqlUser,
} from "server/graphql/mappers.ts";

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
    usersDataloader: createDrizzleDataloader(
      db,
      users,
      mapDbUserToGqlUser,
    ),
    preferencesDataLoader: createDrizzleDataloader(
      db,
      preferences,
      mapDbPreferencesToGqlPreferences,
    ),
    apiClientDataLoader: createDrizzleDataloader(
      db,
      apiClients,
      mapDbApiClientToGqlApiClient,
    ),
  };
}

export type ServerState = Awaited<ReturnType<typeof createServerState>>;
