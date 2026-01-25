import { apiClients, type DbApiClient } from "server/db/schema";
import type { AnimeSkipDatabase } from "./db";
import { inArray } from "drizzle-orm";

export interface ApiClientService {
  softDeleteMany(
    tx: AnimeSkipDatabase,
    ids: string[],
    deletedByUserId: string,
    deletedAt: Date,
  ): Promise<DbApiClient>;
}

export function createApiClientService({
  db: _,
}: {
  db: AnimeSkipDatabase;
}): ApiClientService {
  const softDeleteMany: ApiClientService["softDeleteMany"] = async (
    tx,
    ids,
    deletedByUserId,
    deletedAt,
  ) => {
    const [deleted] = await tx
      .update(apiClients)
      .set({
        updatedAt: deletedAt.toISOString(),
        updatedByUserId: deletedByUserId,
        deletedAt: deletedAt.toISOString(),
        deletedByUserId,
      })
      .where(inArray(apiClients.id, ids))
      .returning();
    return deleted;
  };

  return {
    softDeleteMany,
  };
}
