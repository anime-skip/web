import { fetchStatic } from "@aklinker1/aframe/server";
import { Elysia } from "elysia";
import { applyRateLimit } from "./plugins/apply-rate-limit";
import { errorHandler } from "./plugins/error-handler";
import { resolveApiClient } from "./plugins/resolve-api-client";
import { resolveIpAddress } from "./plugins/resolve-ip-address";
import { resolveRequestId } from "./plugins/resolve-request-id";
import { graphqlRoute } from "./routes/graphql";
import { playgroundRoute } from "./routes/playground";
import { statusRoute } from "./routes/status";
import { swaggerRoute } from "./routes/swagger";

const securedApi = new Elysia({ detail: { security: [{ "X-Client-ID": [] }] } })
  // Plugins
  .use(resolveApiClient)
  .use(applyRateLimit)
  // Routes
  .use(graphqlRoute)
  .use(statusRoute);

const apiRoute = new Elysia({ prefix: "/api" })
  // Plugins
  .use(resolveIpAddress)
  .use(resolveRequestId)
  // Routes
  .use(securedApi)
  .use(playgroundRoute)
  // Error
  .use(errorHandler);

const app = new Elysia()
  // Routes
  .use(swaggerRoute)
  .use(apiRoute)
  .mount(fetchStatic);

export default app;
