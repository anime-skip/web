import Elysia from "elysia";
import playgroundHtmlTemplate from "server/assets/playground.html.tpl" with { type: "text" };
import { decorateContext } from "server/plugins/decorate-context";
import { SHARED_CLIENT_ID } from "shared/constants";

const description = `
Endpoint that hosts the [GraphQL playground](/api/playground), which you can use to:

- Explore the GraphQL API Reference.
- Build and test GraphQL queries.
`.trim();

export const playgroundRoute = new Elysia().use(decorateContext).get(
  "/playground",
  ({ set, version }) => {
    set.headers["content-type"] = "text/html";
    return playgroundHtmlTemplate
      .replaceAll("{{VERSION}}", version)
      .replaceAll("{{CLIENT_ID}}", SHARED_CLIENT_ID);
  },
  {
    detail: {
      tags: ["GraphQL Endpoints"],
      description,
    },
  },
);
