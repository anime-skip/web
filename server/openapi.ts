import { version } from "shared/app";
import apiDocs from "server/assets/api-docs.md" with { type: "text" };
import { SHARED_CLIENT_ID } from "shared/constants";
import type { CreateAppOptions } from "@aklinker1/zeta";

export enum OpenApiTag {
  Graphql = "GraphQL Endpoints",
  Http = "HTTP Endpoints",
}

export enum OpenApiSecurityScheme {
  XClientId = "X-Client-ID",
}

/**
 * @example
 * app.get(
 *   "/",
 *   {},
 *   () => {
 *     // ...
 }
 * )
 */
export const OpenApiSecurity = {
  XClientId: { [OpenApiSecurityScheme.XClientId]: [] },
};

export const openApi: CreateAppOptions["openApi"] = {
  info: {
    title: "Anime Skip API",
    version,
    description: apiDocs.replaceAll("{{SHARED_CLIENT_ID}}", SHARED_CLIENT_ID),
  },
  tags: [
    {
      name: OpenApiTag.Graphql,
      description:
        "This page only documents the request format for making GraphQL requests. To see the full GraphQL schema and it's docs, head over to the [GraphQL Playground](/api/playground).",
    },
    {
      name: OpenApiTag.Http,
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
};
