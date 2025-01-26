import type { AnimeSkipServerMiddleware } from "server/types.ts";

/** Using the header, grab a reference to the requestor's API client. */
export const resolveApiClientMiddleware: AnimeSkipServerMiddleware = async (
  ctx,
  next,
) => {
  ctx.state.ipAddress = ctx.request.ip;
  await next();
};
