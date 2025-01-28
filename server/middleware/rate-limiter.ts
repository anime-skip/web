import { errors } from "@oak/commons/http_errors";
import type { AnimeSkipServerMiddleware } from "server/types";
import { createRateLimiter } from "server/utils/rate-limiter";

const rateLimiter = createRateLimiter();

/** Apply a rate limit for API clients. */
export const rateLimiterMiddleware: AnimeSkipServerMiddleware = async (
  ctx,
  next,
) => {
  if (ctx.state.apiClient.rateLimitRpm != null) {
    const limit = rateLimiter(
      ctx.state.apiClient.id,
      ctx.state.apiClient.rateLimitRpm,
      60e3,
    );
    ctx.response.headers.append("X-Rate-Limit-Limit", String(limit.total));
    ctx.response.headers.append(
      "X-Rate-Limit-Remaining",
      String(Math.max(0, limit.remaining)),
    );
    ctx.response.headers.append(
      "X-Rate-Limit-Reset",
      limit.resetAt.toISOString(),
    );
    if (limit.remaining < 0) {
      throw new errors.TooManyRequests();
    }
  }

  await next();
};
