import type { DbEpisode } from "server/db/schema";
import type { AnimeSkipDatabase } from "./db";
import { todo } from "shared/utils";

export interface EpisodeService {
  softDeleteMany(
    tx: AnimeSkipDatabase,
    ids: string[],
    deletedByUserId: string,
    deletedAt: Date,
  ): Promise<DbEpisode>;
}

export function createEpisodeService({
  db: _,
}: {
  db: AnimeSkipDatabase;
}): EpisodeService {
  const softDeleteMany: EpisodeService["softDeleteMany"] = async (
    _tx,
    _ids,
    _deletedByUserId,
    _deletedAt,
  ) => {
    todo();
  };

  return {
    softDeleteMany,
  };
}
