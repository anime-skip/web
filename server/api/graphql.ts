import { createApp } from "@aklinker1/zeta";
import dedent from "dedent";
import { decorateContext } from "server/plugins/decorate-context";
import { OpenApiSecurity, OpenApiTag } from "server/openapi";
import { GraphqlInput, GraphqlOutput } from "shared/models";
import { graphql, GraphQLSchema } from "graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { rootResolver } from "server/graphql/resolvers";
import { typeDefs } from "server/graphql/type-defs";
import { directiveResolvers } from "server/graphql/directives";
import { attachDirectiveResolvers } from "server/utils/graphql-helpers";
import { createGqlContext } from "server/graphql/context";
import { resolveIpAddress } from "server/plugins/resolve-ip-address";

const schema: GraphQLSchema = attachDirectiveResolvers(
  makeExecutableSchema({
    resolvers: rootResolver,
    typeDefs: typeDefs,
  }),
  directiveResolvers,
);

export const graphqlApp = createApp()
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
      const { operationName = "Unknown", query, variables } = ctx.body;

      ctx.logger.http(
        `Evaluating GraphQL "${operationName}": ${query.replace(/\s+/gm, " ").slice(0, 40)}...`,
      );

      return await graphql({
        schema,
        source: query,
        contextValue: createGqlContext(ctx),
        variableValues: variables,
        operationName: operationName,
      });
    },
  );
