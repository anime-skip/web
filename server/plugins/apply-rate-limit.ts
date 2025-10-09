import { createApp } from "@aklinker1/zeta";
import { requireApiClient } from "./require-api-client";
import { createRateLimiter } from "server/utils/rate-limiter";
import { RateLimitExceededError } from "server/errors";

const rateLimiter = createRateLimiter();

export const applyRateLimit = createApp()
  .use(requireApiClient)
  .onBeforeHandle(({ set, apiClient }) => {
    if (apiClient.rateLimitRpm != null) {
      const limit = rateLimiter(apiClient.id, apiClient.rateLimitRpm, 60e3);

      set.headers["x-rate-limit-limit"] = String(limit.total);
      set.headers["x-rate-limit-remaining"] = String(
        Math.max(0, limit.remaining),
      );
      set.headers["x-rate-limit-reset"] = limit.resetAt.toISOString();

      if (limit.remaining < 0)
        throw new RateLimitExceededError(apiClient.rateLimitRpm);
    }
  })
  .export();
