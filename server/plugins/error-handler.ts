import Elysia from "elysia";
import { serializeError } from "serialize-error";
import { decorateContext } from "./decorate-context";
import { HttpError, HttpInternalServerErrorError } from "server/utils/errors";

export const errorHandler = new Elysia({ name: "error-handler" })
  .use(decorateContext)
  .onError(({ error, code, logger }) => {
    logger.error("Request failed", { error: serializeError(error), code });

    if (error instanceof HttpError) return error.toJson();

    if (error instanceof Error)
      return new HttpInternalServerErrorError(error.message, {
        cause: error,
      }).toJson();

    return new HttpInternalServerErrorError("Unknown error", {
      cause: error,
    }).toJson();
  });
