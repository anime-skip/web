import { inArray } from "drizzle-orm";
import { apiClients, type DbApiClient } from "server/db/schema";

import type { Database } from "./db";

export interface ApiClientService {
  softDeleteMany(
    tx: Database,
    ids: string[],
    deletedByUserId: string,
    deletedAt: Date,
  ): Promise<DbApiClient>;
}

export function createApiClientService({ db: _db }: { db: Database }): ApiClientService {
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
