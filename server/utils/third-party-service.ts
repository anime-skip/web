import { todo } from "shared/utils";
import type { AnimeSkipDatabase } from "./db";

export function createThirdPartyService(_db: AnimeSkipDatabase) {
  return {
    findEpisodeByName(_name: string) {
      throw todo();
    },
  };
}

export type ThirdPartyService = ReturnType<typeof createThirdPartyService>;
