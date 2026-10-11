import { fetchStatic } from "@aklinker1/aframe/server";
import { createApp } from "@aklinker1/zeta";
import { zodSchemaAdapter } from "@aklinker1/zeta/adapters/zod-schema-adapter";
import apiDocs from "server/assets/api-docs.md" with { type: "text" };
import { SHARED_CLIENT_ID } from "shared/constants";
import { version } from "shared/version";

import { graphqlApis } from "./api/graphql-apis";
import { graphqlPlaygroundApis } from "./api/graphql-playground-apis";
import { systemApis } from "./api/system-apis";
import { OpenApiSecurityScheme, OpenApiTag } from "./enums";
import { applyRateLimit } from "./plugins/apply-rate-limit";
import { corsPlugin } from "./plugins/cors";
import { requireApiClient } from "./plugins/require-api-client";
import { traceRequests } from "./plugins/trace-requests";

const apiApp = createApp({ prefix: "/api" })
  // Don't require API Clients
  .use(systemApis)

  // Require API Client
  .use(requireApiClient)
  .use(applyRateLimit)
  .use(graphqlApis);

export const app = createApp({
  schemaAdapter: zodSchemaAdapter,
  openApi: {
    info: {
      title: "Anime Skip API",
      version,
      description: apiDocs.replaceAll("{{SHARED_CLIENT_ID}}", SHARED_CLIENT_ID),
    },
    tags: [
      {
        name: OpenApiTag.System,
      },
      {
        name: OpenApiTag.Graphql,
        description:
          "This page only documents the request format for making GraphQL requests. To see the full GraphQL schema and it's docs, head over to the [GraphQL Playground](/playground).",
      },
    ],
    components: {
      securitySchemes: {
        [OpenApiSecurityScheme.XClientId]: {
          type: "apiKey",
          in: "header",
          name: OpenApiSecurityScheme.XClientId,
        },
      },
    },
    security: [{ [OpenApiSecurityScheme.XClientId]: [] }],
  },
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
  .use(traceRequests)
  .use(corsPlugin)
  .use(graphqlPlaygroundApis)
  .use(apiApp)
  .mount(fetchStatic());

export type App = typeof app;
