import { createApp, NotFoundHttpError } from "@aklinker1/zeta";
import playgroundHtmlTemplate from "server/assets/playground.html.tpl" with { type: "text" };
import { env } from "server/env";
import { SHARED_CLIENT_ID } from "shared/constants";
import { version } from "shared/version";

export const graphqlPlaygroundApis = createApp().get("/playground", async ({ set }) => {
  if (!env.ENABLE_PLAYGROUND) throw new NotFoundHttpError("GraphQL playground is disabled");

  return new Response(
    playgroundHtmlTemplate
      .replaceAll("{{VERSION}}", version)
      .replaceAll("{{CLIENT_ID}}", SHARED_CLIENT_ID),
    { headers: { "content-type": "text/html" } },
  );
});
