import { createApp } from "@aklinker1/zeta";
import { decorateContext } from "./decorate-context";
import { nanoid } from "nanoid";

export const resolveRequestId = createApp()
  .use(decorateContext)
  .onTransform(({ request, logger: _logger, set }) => {
    const requestId = nanoid();
    const logger = _logger.extend("request").extend(requestId);

    set.headers["x-request-id"] = requestId;
    logger.http(`${request.method} ${request.url}`);

    return {
      requestId,
      logger,
    };
  })
  .export();
