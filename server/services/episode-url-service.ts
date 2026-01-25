import { episodeUrls, type DbEpisodeUrl } from "server/db/schema";
import type { AnimeSkipDatabase } from "./db";
import { inArray } from "drizzle-orm";

export interface EpisodeUrlService {
  deleteMany(tx: AnimeSkipDatabase, urls: string[]): Promise<DbEpisodeUrl[]>;
}

export function createEpisodeUrlService({
  db: _,
}: {
  db: AnimeSkipDatabase;
}): EpisodeUrlService {
  const deleteMany: EpisodeUrlService["deleteMany"] = async (tx, urls) => {
    const deleted = await tx
      .delete(episodeUrls)
      .where(inArray(episodeUrls.url, urls))
      .returning();
    return deleted;
  };

  return {
    deleteMany,
  };
}
