import { errors } from "@oak/commons/http_errors";
import type { AnimeSkipServerHandler } from "server/types.ts";

export const apiNotFoundHandler: AnimeSkipServerHandler<string> = (ctx) => {
  throw new errors.NotFound(
    `${ctx.request.method} ${ctx.request.url.pathname} is not a known API endpoint`,
  );
};
