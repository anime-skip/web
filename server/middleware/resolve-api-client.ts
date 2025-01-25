import type { AnimeSkipServerMiddleware } from "server/types.ts";
import { apiClients } from "server/db/schema.ts";
import { eq } from "drizzle-orm";
import { errors } from "@oak/commons/http_errors";

/** Using the header, grab a reference to the requestor's API client. */
export const resolveApiClientMiddleware: AnimeSkipServerMiddleware = async (
  ctx,
  next,
) => {
  const clientId = ctx.request.headers.get("X-Client-ID");
  if (clientId == null) {
    throw new errors.BadRequest("Missing required header: X-Client-ID");
  }

  const apiClient = await ctx.state.db.query.apiClients.findFirst({
    where: eq(apiClients.id, clientId),
  });
  if (apiClient == null) {
    throw new errors.BadRequest("API Client not found with id=" + clientId);
  }

  ctx.state.apiClient = apiClient;

  await next();
};
