import type { AnimeSkipServerHandler } from "server/types";
import { version } from "shared/app";

export const apiStatusHandler: AnimeSkipServerHandler<"/api/status"> = (
  ctx,
) => {
  ctx.response.body = {
    status: "UP",
    version,
  };
};
