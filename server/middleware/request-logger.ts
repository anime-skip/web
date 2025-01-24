import type { Status } from "@oak/commons/status";
import type { AnimeSkipServerMiddleware } from "server/types.ts";
import { Color, logger } from "server/utils/logger.ts";
import { createTimer } from "shared/time.ts";

export const requestLoggerMiddleware: AnimeSkipServerMiddleware = async (
  ctx,
  next,
) => {
  const timer = createTimer();
  try {
    await next();
  } finally {
    logger.http(
      `${ctx.request.method} ${ctx.request.url.pathname} → ${
        statusCodeColor(ctx.response.status)
      }${ctx.response.status}${Color.Reset} ${Color.Dim}${timer.duration()}${Color.Reset}`,
    );
  }
};

function statusCodeColor(status: Status): string {
  if (status >= 200 && status < 400) return Color.Green;
  if (status < 500) return Color.Yellow;
  return Color.Red;
}
