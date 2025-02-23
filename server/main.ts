import { fetchStatic, type AframeServer } from "@aklinker1/aframe/server";
import { Application } from "@oak/oak/application";
import { Router } from "@oak/oak/router";
import { errorHandlerMiddleware } from "server/middleware/error-handler";
import type { AnimeSkipServer } from "server/types";
import { apiStatusHandler } from "server/routes/api/status";
import { graphqlHandler } from "server/routes/graphql";
import { playgroundHandler } from "server/routes/playground";
import { requestLoggerMiddleware } from "server/middleware/request-logger";
import { apiNotFoundHandler } from "server/routes/api/not-found";
import { createServerState, type ServerState } from "server/state";
import { resolveApiClientMiddleware } from "server/middleware/resolve-api-client";
import { rateLimiterMiddleware } from "server/middleware/rate-limiter";

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
router.get("/(.*)", async (ctx) => {
  const res = await fetchStatic(new Request(ctx.request.url));
  ctx.response.status = res.status;
  ctx.response.body = res.body;
  res.headers.entries().forEach(([header, value]) => {
    ctx.response.headers.append(header, value);
  });
});

const app: AnimeSkipServer = new Application({
  state,
  contextState: "alias",
});
app.use(requestLoggerMiddleware);
app.use(errorHandlerMiddleware);
app.use(router.routes(), router.allowedMethods());

export default {
  listen(port) {
    return app.listen({ port });
  },
} satisfies AframeServer;
