import { todo } from "shared/utils";
import type { AnimeSkipDatabase } from "./db";

export interface ThirdPartyService {
  findEpisodeByName(name: string): Promise<GqlThirdPartyEpisode[]>;
}

export function createThirdPartyService({
  db: _,
}: {
  db: AnimeSkipDatabase;
}): ThirdPartyService {
  const findEpisodeByName: ThirdPartyService["findEpisodeByName"] = (_name) => {
    todo("ThirdPartyService.findEpisodeByName");
  };

  return {
    findEpisodeByName,
  };
}
