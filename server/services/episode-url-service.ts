import { inArray } from "drizzle-orm";
import { episodeUrls, type DbEpisodeUrl } from "server/db/schema";

import type { Database } from "./db";

export interface EpisodeUrlService {
  deleteMany(tx: Database, urls: string[]): Promise<DbEpisodeUrl[]>;
  deleteCascade(tx: Database, urls: string[]): Promise<DbEpisodeUrl[]>;
}

export function createEpisodeUrlService({ db: _db }: { db: Database }): EpisodeUrlService {
  const deleteMany: EpisodeUrlService["deleteMany"] = async (tx, urls) => {
    if (urls.length === 0) {
      return [];
    }
    const deleted = await tx.delete(episodeUrls).where(inArray(episodeUrls.url, urls)).returning();
    return deleted;
  };

  const deleteCascade: EpisodeUrlService["deleteCascade"] = async (tx, urls) => {
    // Nothing to cascade - just delete the episode URLs
    return deleteMany(tx, urls);
  };

  return {
    deleteMany,
    deleteCascade,
  };
}
