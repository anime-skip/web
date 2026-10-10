import { eq } from "drizzle-orm";
import { preferences, type DbPreferences } from "server/db/schema";

import type { AnimeSkipDatabase } from "./db";

export interface PreferencesService {
  softDeleteByUserId(
    tx: AnimeSkipDatabase,
    userId: string,
    deletedAt: Date,
  ): Promise<DbPreferences | null>;
}

export function createPreferencesService({
  db: _db,
}: {
  db: AnimeSkipDatabase;
}): PreferencesService {
  const softDeleteByUserId: PreferencesService["softDeleteByUserId"] = async (
    tx,
    userId,
    deletedAt,
  ) => {
    const [deleted] = await tx
      .update(preferences)
      .set({
        updatedAt: deletedAt.toISOString(),
        deletedAt: deletedAt.toISOString(),
      })
      .where(eq(preferences.userId, userId))
      .returning();
    return deleted ?? null;
  };

  return {
    softDeleteByUserId,
  };
}
