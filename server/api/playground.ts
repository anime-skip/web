import { createApp } from "@aklinker1/zeta";
import dedent from "dedent";
import { decorateContext } from "server/plugins/decorate-context";
import playgroundHtmlTemplate from "server/assets/playground.html.tpl" with { type: "text" };
import { OpenApiTag } from "server/openapi";
import { SHARED_CLIENT_ID } from "shared/constants";
import { GetGraphqlPlaygroundOutput } from "shared/models";

export const playgroundApp = createApp()
  .use(decorateContext)
  .get(
    "/playground",
    {
      operationId: "getGraphqlPlayground",
      summary: "Get GraphQL Playground",
      tags: [OpenApiTag.Graphql],
      description: dedent`
        Endpoint that hosts the [GraphQL playground](/api/playground), which you can use to:

        - Explore the GraphQL API Reference.
        - Build and test GraphQL queries.
      `,
      responses: GetGraphqlPlaygroundOutput,
    },
    async ({ set, version }) => {
      set.headers["content-type"] = "text/html";
      return playgroundHtmlTemplate
        .replaceAll("{{VERSION}}", version)
        .replaceAll("{{CLIENT_ID}}", SHARED_CLIENT_ID);
    },
  );
