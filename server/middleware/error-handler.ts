import { STATUS_TEXT } from "@oak/commons/status";
import { errors, isHttpError } from "@oak/commons/http_errors";
import type { ErrorResponse } from "shared/types.ts";
import type { AnimeSkipServerMiddleware } from "server/types.ts";

export const errorHandlerMiddleware: AnimeSkipServerMiddleware = async (
  ctx,
  next,
) => {
  try {
    await next();
  } catch (_err) {
    const err = isHttpError(_err)
      ? _err
      : new errors.InternalServerError("Unhandled error", { cause: _err });
    ctx.state.logger.error(err);
    ctx.response.status = err.status;
    ctx.response.body = {
      status: err.status,
      statusText: STATUS_TEXT[err.status],
      message: err.message,
    } satisfies ErrorResponse;
  }
};
