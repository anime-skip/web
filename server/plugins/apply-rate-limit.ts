import Elysia from "elysia";
import { resolveApiClient } from "./resolve-api-client";
import { HttpTooManyRequestsError } from "server/utils/errors";
import { createRateLimiter } from "server/utils/rate-limiter";

const rateLimiter = createRateLimiter();

export const applyRateLimit = new Elysia({
  name: "apply-rate-limit",
})
  .use(resolveApiClient)
  .onBeforeHandle(({ set, apiClient }) => {
    if (apiClient.rateLimitRpm != null) {
      const limit = rateLimiter(apiClient.id, apiClient.rateLimitRpm, 60e3);
      set.headers["x-rate-limit-limit"] = limit.total;
      set.headers["x-rate-limit-remaining"] = Math.max(0, limit.remaining);
      set.headers["x-rate-limit-reset"] = limit.resetAt.toISOString();
      if (limit.remaining < 0) {
        throw new HttpTooManyRequestsError(
          `Exceeded rate limit of ${apiClient.rateLimitRpm} requests/minute`,
        );
      }
    }
  })
  .as("global");
