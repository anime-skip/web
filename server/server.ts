import { Application } from "@oak/oak/application";
import { Router } from "@oak/oak/router";
import { errorHandlerMiddleware } from "server/middleware/error-handler";
import type { AnimeSkipServer } from "server/types";
import { Color, logger } from "server/utils/logger";
import { apiStatusHandler } from "server/routes/api/status";
import { graphqlHandler } from "server/routes/graphql";
import { playgroundHandler } from "server/routes/playground";
import { staticHandler } from "server/routes/static";
import { requestLoggerMiddleware } from "server/middleware/request-logger";
import { apiNotFoundHandler } from "server/routes/api/not-found";
import { createServerState, type ServerState } from "server/state";
import { resolveApiClientMiddleware } from "server/middleware/resolve-api-client";
import { rateLimiterMiddleware } from "server/middleware/rate-limiter";

export async function createServer(): Promise<AnimeSkipServer> {
  const state = await createServerState();

  const router = new Router<ServerState>();
  router.get(
    "/api/status",
    resolveApiClientMiddleware,
    rateLimiterMiddleware,
    apiStatusHandler,
  );
  router.all(
    "/api/(.*)",
    resolveApiClientMiddleware,
    rateLimiterMiddleware,
    apiNotFoundHandler,
  );
  router.post(
    "/graphql",
    resolveApiClientMiddleware,
    rateLimiterMiddleware,
    graphqlHandler,
  );
  router.get("/playground", playgroundHandler);
  router.get("/(.*)", staticHandler);

  const app: AnimeSkipServer = new Application({
    state,
    contextState: "alias",
  });
  app.use(requestLoggerMiddleware);
  app.use(errorHandlerMiddleware);
  app.use(router.routes(), router.allowedMethods());
  app.addEventListener("listen", () => {
    logger.info(
      `Server started @ ${Color.Dim}${Color.Underline}http://localhost:${state.port}${Color.Reset}`,
    );
  });

  return app;
}
