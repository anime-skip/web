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
import { attachDirectiveResolvers } from "server/utils/graphql-helpers";
import { OpenApiSecurity } from "server/utils/openapi";
import { GraphqlInput, GraphqlOutput } from "shared/models";

const logger = createLogger("graphql-apis");

const schema: GraphQLSchema = attachDirectiveResolvers(
  makeExecutableSchema({
    resolvers: rootResolver,
    typeDefs: typeDefs,
  }),
  directiveResolvers,
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

      return await graphql({
        schema,
        source: query,
        contextValue: createGqlContext(ctx),
        variableValues: variables,
        operationName,
      });
    },
  );
