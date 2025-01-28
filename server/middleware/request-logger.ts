import type { Status } from "@oak/commons/status";
import type { AnimeSkipServerMiddleware } from "server/types";
import { Color, logger } from "server/utils/logger";
import { createTimer } from "shared/time";
import { nanoid } from "nanoid";

export const requestLoggerMiddleware: AnimeSkipServerMiddleware = async (
  ctx,
  next,
) => {
  ctx.state.requestId = nanoid();
  ctx.response.headers.set("X-Request-ID", ctx.state.requestId);

  ctx.state.logger = logger.extend("request").extend(ctx.state.requestId);

  const timer = createTimer();
  try {
    await next();
  } finally {
    ctx.state.logger.http(
      `${ctx.request.method} ${ctx.request.url.pathname} → ${statusCodeColor(
        ctx.response.status,
      )}${ctx.response.status}${Color.Reset} ${Color.Dim}${timer.duration()}${Color.Reset}`,
    );
  }
};

function statusCodeColor(status: Status): string {
  if (status >= 200 && status < 400) return Color.Green;
  if (status < 500) return Color.Yellow;
  return Color.Red;
}
