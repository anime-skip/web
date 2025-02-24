import { Elysia, t } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { fetchStatic } from "@aklinker1/aframe/server";
import { openAnimeSkipDatabase } from "./utils/db";
import { createThirdPartyService } from "./utils/third-party-service";
import { version } from "shared/app";
import {
  HttpBadRequestError,
  HttpError,
  HttpInternalServerErrorError,
  HttpTooManyRequestsError,
} from "./utils/errors";
import {
  ErrorResponse,
  GetStatusResponse,
  GraphqlRequestBody,
  GraphqlResponse,
} from "shared/types";
import playgroundHtmlTemplate from "server/assets/playground.html" with { type: "text" };
import apiDocs from "server/assets/api-docs.md" with { type: "text" };
import { logger } from "server/utils/logger";
import { SHARED_CLIENT_ID } from "shared/constants";
import { createRateLimiter } from "./utils/rate-limiter";
import { graphql, type GraphQLSchema } from "graphql";
import { attachDirectiveResolvers } from "./routes/graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { typeDefs } from "./graphql/type-defs";
import { rootResolver } from "./graphql/resolvers";
import { directiveResolvers } from "./graphql/directives";
import { createGqlContext } from "./graphql/context";
import { serializeError } from "serialize-error";
import { eq } from "drizzle-orm";
import { apiClients } from "./db/schema";
import { nanoid } from "nanoid";

const db = await openAnimeSkipDatabase();
const thirdPartyService = createThirdPartyService(db);
const rateLimiter = createRateLimiter();
const schema: GraphQLSchema = attachDirectiveResolvers(
  makeExecutableSchema({
    resolvers: rootResolver,
    typeDefs: typeDefs,
  }),
  directiveResolvers,
);

const context = new Elysia({ name: "context" })
  .decorate({
    db,
    thirdPartyService,
    logger,
  })
  .as("plugin");

const models = new Elysia({ name: "models" })
  .model({
    ErrorResponse,
    GetStatusResponse,
    GraphqlRequestBody,
    GraphqlResponse,
  })
  .as("plugin");

const securedApi = new Elysia({ detail: { security: [{ "X-Client-ID": [] }] } })
  .use(context)
  .use(models)
  .guard({
    response: {
      400: "ErrorResponse",
    },
  })
  // Resolve IP
  .resolve(({ headers, request }) => {
    return {
      ip: headers["x-forwarded-for"] ?? headers["x-real-ip"],
    };
  })
  // Resolve API Client
  .resolve(async ({ headers, db }) => {
    const clientId = headers["x-client-id"];
    if (!clientId) {
      throw new HttpBadRequestError("X-Client-ID header missing");
    }

    const apiClient = await db.query.apiClients.findFirst({
      where: eq(apiClients.id, clientId),
    });
    if (!apiClient) {
      throw new HttpBadRequestError("API client not found", {
        cause: { clientId },
      });
    }

    return {
      apiClient,
    };
  })
  // Enforce rate limiting
  .onBeforeHandle(({ set, apiClient }) => {
    if (apiClient.rateLimitRpm != null) {
      const limit = rateLimiter(apiClient.id, apiClient.rateLimitRpm, 60e3);
      set.headers["X-Rate-Limit-Limit"] = limit.total;
      set.headers["X-Rate-Limit-Remaining"] = Math.max(0, limit.remaining);
      set.headers["X-Rate-Limit-Reset"] = limit.resetAt.toISOString();
      if (limit.remaining < 0) {
        throw new HttpTooManyRequestsError(
          `Exceeded rate limit of ${apiClient.rateLimitRpm} requests/minute`,
        );
      }
    }
  })
  .post(
    "/graphql",
    async (ctx: any) => {
      const {
        operationName = "Unknown",
        query,
        variables,
      } = ctx.body as GraphqlRequestBody;

      ctx.logger.http(
        `Evaluating GraphQL ${operationName}: ${query.replace(/\s+/gm, " ").slice(0, 40)}...`,
      );

      return await graphql({
        schema,
        source: query,
        contextValue: createGqlContext(ctx),
        variableValues: variables,
        operationName: operationName,
      });
    },
    {
      body: "GraphqlRequestBody",
      detail: {
        description: "Endpoint for querying GraphQL.",
        tags: ["GraphQL Endpoints"],
      },
      response: "GraphqlResponse",
    },
  )
  .get("/status", (ctx) => ({ status: "UP" as const, version }), {
    response: "GetStatusResponse",
    detail: {
      description: "Check on the server's status.",
      tags: ["HTTP Endpoints"],
    },
  });

const api = new Elysia({ prefix: "/api" })
  .use(context)
  .use(models)
  .resolve(({ request, logger: _logger, set }) => {
    const requestId = nanoid();
    const logger = _logger.extend("request").extend(requestId);
    set.headers["x-request-id"] = requestId;
    logger.http(`${request.method} ${request.url}`);
    return {
      requestId,
      logger,
    };
  })
  .use(securedApi)
  .get(
    "/playground",
    ({ set }) => {
      set.headers["content-type"] = "text/html";
      return playgroundHtmlTemplate
        .replaceAll("{{VERSION}}", version)
        .replaceAll("{{CLIENT_ID}}", SHARED_CLIENT_ID);
    },
    {
      detail: {
        tags: ["GraphQL Endpoints"],
        description: [
          "Endpoint that hosts the [GraphQL playground](/api/playground), which you can use to:",
          "",
          "- Explore the GraphQL API Reference.",
          "- Build and test GraphQL queries.",
        ].join("\n"),
      },
    },
  )
  .onError(({ error, code, logger }) => {
    logger.error("Request failed", { error: serializeError(error), code });
    if (error instanceof HttpError) return error.toJson();
    if (error instanceof Error)
      return new HttpInternalServerErrorError(error.message, {
        cause: error,
      }).toJson();
    return new HttpInternalServerErrorError("Unknown error", {
      cause: error,
    }).toJson();
  });

const app = new Elysia()
  .use(
    swagger({
      path: "/api/swagger",
      scalarConfig: {
        hideDownloadButton: true,
        defaultOpenAllTags: true,
        authentication: {
          apiKey: {
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
          { name: "HTTP Endpoints" },
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
  )
  .use(context)
  .use(api)
  .mount(fetchStatic);

export default app;

// const state = await createServerState();

// const router = new Router<ServerState>();
// router.get(
//   "/api/status",
//   resolveApiClientMiddleware,
//   rateLimiterMiddleware,
//   apiStatusHandler,
// );
// router.all(
//   "/api/(.*)",
//   resolveApiClientMiddleware,
//   rateLimiterMiddleware,
//   apiNotFoundHandler,
// );
// router.post(
//   "/graphql",
//   resolveApiClientMiddleware,
//   rateLimiterMiddleware,
//   graphqlHandler,
// );
// router.get("/playground", playgroundHandler);
// router.get("/(.*)", async (ctx) => {
//   const res = await fetchStatic(new Request(ctx.request.url));
//   ctx.response.status = res.status;
//   ctx.response.body = res.body;
//   res.headers.entries().forEach(([header, value]) => {
//     ctx.response.headers.append(header, value);
//   });
// });

// const app: AnimeSkipServer = new Application({
//   state,
//   contextState: "alias",
// });
// app.use(requestLoggerMiddleware);
// app.use(errorHandlerMiddleware);
// app.use(router.routes(), router.allowedMethods());

// export default {
//   listen(port) {
//     return app.listen({ port });
//   },
// } satisfies AframeServer;
