import type { DbEpisodeUrl } from "server/db/schema";
import type { AnimeSkipDatabase } from "./db";
import { todo } from "shared/utils";

export interface EpisodeUrlService {
  deleteMany(tx: AnimeSkipDatabase, urls: string[]): Promise<DbEpisodeUrl>;
}

export function createEpisodeUrlService({
  db: _,
}: {
  db: AnimeSkipDatabase;
}): EpisodeUrlService {
  const deleteMany: EpisodeUrlService["deleteMany"] = async (_tx, _urls) => {
    todo();
  };

  return {
    deleteMany,
  };
}
