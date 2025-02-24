import Elysia from "elysia";
import { graphql } from "graphql";
import { createGqlContext } from "server/graphql/context";
import type { GraphqlRequestBody } from "shared/types";
import { directiveResolvers } from "server/graphql/directives";
import { rootResolver } from "server/graphql/resolvers";
import { typeDefs } from "server/graphql/type-defs";
import type { GraphQLSchema } from "graphql";
import { attachDirectiveResolvers } from "server/utils/graphql-helpers";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { models } from "server/plugins/models";

const schema: GraphQLSchema = attachDirectiveResolvers(
  makeExecutableSchema({
    resolvers: rootResolver,
    typeDefs: typeDefs,
  }),
  directiveResolvers,
);

export const graphqlRoute = new Elysia().use(models).post(
  "/graphql",
  async (ctx: any) => {
    const {
      operationName = "Unknown",
      query,
      variables,
    } = ctx.body as GraphqlRequestBody;

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
  {
    body: "GraphqlRequestBody",
    detail: {
      description: "Endpoint for querying GraphQL.",
      tags: ["GraphQL Endpoints"],
    },
    response: "GraphqlResponse",
  },
);
