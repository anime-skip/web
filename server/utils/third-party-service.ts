import { todo } from "shared/utils";
import type { AnimeSkipDatabase } from "./db";

export function createThirdPartyService(db: AnimeSkipDatabase) {
  return {
    findByName(name: string) {
      throw todo();
    },
  };
}

export type ThirdPartyService = ReturnType<typeof createThirdPartyService>;
