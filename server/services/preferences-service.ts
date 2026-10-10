import { eq } from "drizzle-orm";
import { preferences, type DbPreferences } from "server/db/schema";

import type { Database } from "./db";

export interface PreferencesService {
  softDeleteByUserId(tx: Database, userId: string, deletedAt: Date): Promise<DbPreferences | null>;
}

export function createPreferencesService({ db: _db }: { db: Database }): PreferencesService {
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
