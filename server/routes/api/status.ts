import denoJson from "../../../deno.json" with { type: "json" };
import type { AnimeSkipServerHandler } from "server/types.ts";

export const apiStatusHandler: AnimeSkipServerHandler<"/api/status"> = (
  ctx,
) => {
  ctx.response.body = {
    status: "UP",
    version: denoJson.version,
  };
};
