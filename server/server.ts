import { Application } from "@oak/oak/application";
import { Router } from "@oak/oak/router";
import { errorHandlerMiddleware } from "server/middleware/error-handler.ts";
import type { AnimeSkipServer } from "server/types.ts";
import { Color, logger } from "server/utils/logger.ts";
import { apiStatusHandler } from "server/routes/api/status.ts";
import { graphqlHandler } from "server/routes/graphql.ts";
import { playgroundHandler } from "server/routes/playground.ts";
import { staticHandler } from "server/routes/static.ts";
import { requestLoggerMiddleware } from "server/middleware/request-logger.ts";
import { apiNotFoundHandler } from "server/routes/api/not-found.ts";
import { createServerState, type ServerState } from "server/state.ts";

export async function createServer(): Promise<AnimeSkipServer> {
  const state = await createServerState();

  const router = new Router<ServerState>();
  router.get("/api/status", apiStatusHandler);
  router.all("/api/(.*)", apiNotFoundHandler);
  router.add(["GET", "POST"], "/graphql", graphqlHandler(state));
  router.get("/playground", playgroundHandler);
  router.get("/(.*)", staticHandler);

  const app: AnimeSkipServer = new Application({ state });
  app.use(requestLoggerMiddleware);
  app.use(errorHandlerMiddleware);
  app.use(router.routes());
  app.use(router.allowedMethods());
  app.addEventListener("listen", () => {
    logger.info(
      `Server started @ ${Color.Dim}${Color.Underline}http://localhost:${state.port}${Color.Reset}`,
    );
  });

  return app;
}
