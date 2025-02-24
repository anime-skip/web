import { eq } from "drizzle-orm";
import Elysia from "elysia";
import { apiClients } from "server/db/schema";
import { HttpBadRequestError } from "server/utils/errors";
import { decorateContext } from "./decorate-context";

export const resolveApiClient = new Elysia({ name: "resolve-api-client" })
  .use(decorateContext)
  .resolve(async ({ headers, db }) => {
    const clientId = headers["x-client-id"];
    if (!clientId) {
      throw new HttpBadRequestError("X-Client-ID header missing");
    }

    const apiClient = await db.query.apiClients.findFirst({
      where: eq(apiClients.id, clientId),
    });
    if (!apiClient) {
      throw new HttpBadRequestError("API client not found", {
        cause: { clientId },
      });
    }

    return {
      apiClient,
    };
  })
  .as("plugin");
