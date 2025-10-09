import { eq } from "drizzle-orm";
import { createApp } from "@aklinker1/zeta";
import { apiClients } from "server/db/schema";
import { decorateContext } from "./decorate-context";
import {
  ApiClientNotFoundError,
  XClientIdHeaderMissingError,
} from "server/errors";

export const requireApiClient = createApp()
  .use(decorateContext)
  .onTransform(async ({ headers, db }) => {
    const clientId = headers?.["x-client-id"];
    if (!clientId) throw new XClientIdHeaderMissingError();

    const apiClient = await db.query.apiClients.findFirst({
      where: eq(apiClients.id, clientId),
    });
    if (!apiClient) throw new ApiClientNotFoundError(clientId);

    return {
      apiClient,
    };
  })
  .export();
