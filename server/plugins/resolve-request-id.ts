import { createApp } from "@aklinker1/zeta";
import { decorateContext } from "./decorate-context";
import { nanoid } from "nanoid";
import { createLogger } from "@aklinker1/logger";

const logger = createLogger("http");

export const resolveRequestId = createApp()
  .use(decorateContext)
  .onGlobalRequest(({ set, method, path }) => {
    const start = new Date();
    const requestId = nanoid();

    set.headers["x-request-id"] = requestId;
    logger.info("Request started", { method, path, requestId });

    return {
      requestId,
      start,
    };
  })
  .onTransform(({ method, requestId, route }) => {
    logger.info("Route resolved", { method, route, requestId });
  })
  .onGlobalError(({ method, requestId, route, error, set, start }) => {
    const end = Date.now();
    logger.info("Request error", {
      method,
      route,
      requestId,
      durationMs: end - start.getTime(),
      status: set.status,
      error,
    });
  })
  .onGlobalAfterResponse(({ method, requestId, route, set, start }) => {
    const end = Date.now();
    logger.info("Response sent", {
      method,
      route,
      requestId,
      durationMs: end - start.getTime(),
      status: set.status,
    });
  })
  .export();
