import Elysia from "elysia";
import { decorateContext } from "./decorate-context";
import { nanoid } from "nanoid";

export const resolveRequestId = new Elysia({ name: "resolve-request-id" })
  .use(decorateContext)
  .resolve(({ request, logger: _logger, set }) => {
    const requestId = nanoid();
    const logger = _logger.extend("request").extend(requestId);
    set.headers["x-request-id"] = requestId;
    logger.http(`${request.method} ${request.url}`);
    return {
      requestId,
      logger,
    };
  })
  .as("global");
