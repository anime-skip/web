import swagger from "@elysiajs/swagger";
import Elysia from "elysia";
import { SHARED_CLIENT_ID } from "shared/constants";
import apiDocs from "server/assets/api-docs.md" with { type: "text" };
import { version } from "shared/app";

export const swaggerRoute = new Elysia().use(
  swagger({
    path: "/api/swagger",
    scalarConfig: {
      hideDownloadButton: true,
      defaultOpenAllTags: true,
      authentication: {
        apiKey: {
          // Apply shared client ID by default
          token: SHARED_CLIENT_ID,
        },
      },
    },
    documentation: {
      info: {
        title: "Anime Skip API",
        version,
        description: apiDocs.replaceAll(
          "{{SHARED_CLIENT_ID}}",
          SHARED_CLIENT_ID,
        ),
      },
      tags: [
        {
          name: "GraphQL Endpoints",
          description:
            "This page only documents the request format for making GraphQL requests. To see the full GraphQL schema and it's docs, head over to the [GraphQL Playground](/api/playground).",
        },
        {
          name: "HTTP Endpoints",
        },
      ],
      components: {
        securitySchemes: {
          "X-Client-ID": {
            type: "apiKey",
            in: "header",
            name: "X-Client-ID",
          },
        },
      },
      security: [{ "X-Client-ID": [] }],
    },
  }),
);
