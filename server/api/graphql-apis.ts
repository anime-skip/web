import { createLogger } from "@aklinker1/logger";
import { createApp } from "@aklinker1/zeta";
import { makeExecutableSchema } from "@graphql-tools/schema";
import dedent from "dedent";
import { graphql, GraphQLSchema } from "graphql";
import { OpenApiTag } from "server/enums";
import { createGqlContext } from "server/graphql/context";
import { directiveResolvers } from "server/graphql/directives";
import { rootResolver } from "server/graphql/resolvers";
import { typeDefs } from "server/graphql/type-defs";
import { decorateContext } from "server/plugins/decorate-context";
import { resolveIpAddress } from "server/plugins/resolve-ip-address";
import { attachDirectiveResolvers, traceResolvers } from "server/utils/graphql-helpers";
import { OpenApiSecurity } from "server/utils/openapi";
import { SpanKind, SpanStatusCode, withSpan } from "server/utils/telemetry";
import { GraphqlInput, GraphqlOutput } from "shared/models";

const logger = createLogger("graphql-apis");

const schema: GraphQLSchema = traceResolvers(
  attachDirectiveResolvers(
    makeExecutableSchema({
      resolvers: rootResolver,
      typeDefs: typeDefs,
    }),
    directiveResolvers,
  ),
);

export const graphqlApis = createApp()
  .use(resolveIpAddress)
  .use(decorateContext)
  .post(
    "/graphql",
    {
      operationId: "graphql",
      summary: "GraphQL",
      tags: [OpenApiTag.Graphql],
      security: [OpenApiSecurity.XClientId],
      description: dedent``,
      body: GraphqlInput,
      responses: GraphqlOutput,
    },
    async (ctx) => {
      const { operationName, query, variables } = ctx.body;

      logger.info(`Evaluating GraphQL`, {
        operationName,
        queryHash: Bun.sha(query, "base64url"),
        query: query.replace(/\s+/gm, " ").slice(0, 40),
      });

      return await withSpan(
        `graphql.execute ${operationName ? ` ${operationName}` : ""}`,
        {
          kind: SpanKind.INTERNAL,
          attributes: {
            "graphql.operation.name": operationName ?? undefined,
            "graphql.query.hash": Bun.sha(query, "base64url"),
          },
        },
        async (span) => {
          const result = await graphql({
            schema,
            source: query,
            contextValue: createGqlContext(ctx),
            variableValues: variables ?? undefined,
            operationName,
          });
          if (result.errors?.length) {
            span.setAttribute("graphql.error_count", result.errors.length);
            span.setStatus({ code: SpanStatusCode.ERROR, message: result.errors[0]!.message });
          }
          return result;
        },
      );
    },
  );
