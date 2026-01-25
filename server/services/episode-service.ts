import { episodes, type DbEpisode } from "server/db/schema";
import type { AnimeSkipDatabase } from "./db";
import { inArray } from "drizzle-orm";

export interface EpisodeService {
  softDeleteMany(
    tx: AnimeSkipDatabase,
    ids: string[],
    deletedByUserId: string,
    deletedAt: Date,
  ): Promise<DbEpisode[]>;
}

export function createEpisodeService({
  db: _,
}: {
  db: AnimeSkipDatabase;
}): EpisodeService {
  const softDeleteMany: EpisodeService["softDeleteMany"] = async (
    tx,
    ids,
    deletedByUserId,
    deletedAt,
  ) => {
    const deleted = await tx
      .update(episodes)
      .set({
        updatedAt: deletedAt.toISOString(),
        updatedByUserId: deletedByUserId,
        deletedAt: deletedAt.toISOString(),
        deletedByUserId,
      })
      .where(inArray(episodes.id, ids))
      .returning();
    return deleted;
  };

  return {
    softDeleteMany,
  };
}
