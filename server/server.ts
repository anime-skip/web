import { Application } from "@oak/oak/application";
import { Router } from "@oak/oak/router";
import { errorHandlerMiddleware } from "server/middleware/error-handler.ts";
import type { AnimeSkipServer, ServerState } from "server/types.ts";
import { Color, logger } from "server/utils/logger.ts";
import { apiStatusHandler } from "server/routes/api/status.ts";
import { graphqlHandler } from "server/routes/graphql.ts";
import { playgroundHandler } from "server/routes/playground.ts";
import { staticHandler } from "server/routes/static.ts";
import { requestLoggerMiddleware } from "server/middleware/request-logger.ts";
import { apiNotFoundHandler } from "server/routes/api/not-found.ts";

export async function createServer(): Promise<AnimeSkipServer> {
  const port = Number(Deno.env.get("AS_PORT")) || 3000;
  const domain = Deno.env.get("AS_DOMAIN") ?? "localhost";
  const origin = domain === "localhost"
    ? `http://${domain}:${port}`
    : `https://${domain}`;

  const state: ServerState = {
    port,
    domain,
    origin,
    logger,
  };

  const router = new Router<ServerState>();

  router.get("/api/status", apiStatusHandler);
  router.all("/api/(.*)", apiNotFoundHandler);
  router.add(["GET", "POST"], "/graphql", graphqlHandler);
  router.get("/playground", playgroundHandler);
  router.get("/(.*)", staticHandler);

  const app: AnimeSkipServer = new Application({ state });

  app.use(requestLoggerMiddleware);
  app.use(errorHandlerMiddleware);
  app.use(router.routes());
  app.use(router.allowedMethods());

  app.addEventListener("listen", () => {
    logger.info(
      `Server started @ ${Color.Dim}${Color.Underline}http://localhost:${port}${Color.Reset}`,
    );
  });

  return app;
}
