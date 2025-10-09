import { fetchStatic } from "@aklinker1/aframe/server";
import { createApp } from "@aklinker1/zeta";
import { zodSchemaAdapter } from "@aklinker1/zeta/adapters/zod-schema-adapter";
import { applyRateLimit } from "./plugins/apply-rate-limit";
import { requireApiClient } from "./plugins/require-api-client";
import { graphqlApp } from "./api/graphql";
import { httpApp } from "./api/http";
import { playgroundApp } from "./api/playground";
import { SHARED_CLIENT_ID } from "shared/constants";
import { openApi } from "./openapi";
import { logger as _logger } from "./utils/logger";

const logger = _logger.extend("main");

const securedApiApp = createApp()
  // Plugins
  .use(requireApiClient)
  .use(applyRateLimit)
  // Routes
  .use(graphqlApp)
  .use(httpApp);

const apiApp = createApp({ prefix: "/api" })
  // Insecure routes
  .use(playgroundApp)
  // Secure routes
  .use(securedApiApp);

const app = createApp({
  schemaAdapter: zodSchemaAdapter,
  openApi,
  scalar: {
    // Hide default download button and provide our own
    hideDownloadButton: true,
    // Apply shared client ID by default
    authentication: {
      apiKey: {
        token: SHARED_CLIENT_ID,
      },
    },
  },
})
  .use(apiApp)
  .mount(fetchStatic());

logger.info("App created");

export default app;
