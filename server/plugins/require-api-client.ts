import { createApp } from "@aklinker1/zeta";
import { eq } from "drizzle-orm";
import { apiClients } from "server/db/schema";
import { ApiClientNotFoundError, XClientIdHeaderMissingError } from "server/errors";

import { decorateContext } from "./decorate-context";

export const requireApiClient = createApp()
  .use(decorateContext)
  .onTransform(async ({ headers, deps }) => {
    const clientId = headers?.["x-client-id"];
    if (!clientId) throw new XClientIdHeaderMissingError();

    const apiClient = await deps.db.query.apiClients.findFirst({
      where: eq(apiClients.id, clientId),
    });
    if (!apiClient) throw new ApiClientNotFoundError(clientId);

    return {
      apiClient,
    };
  })
  .export();
