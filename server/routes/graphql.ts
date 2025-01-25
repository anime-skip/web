import { loadGraphqlSchema } from "server/assets/graphql/index.ts";
import type { AnimeSkipServerHandler } from "server/types.ts";
import { GraphQLHTTP } from "@deno-libs/gql";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { logger } from "server/utils/logger.ts";
import { rootResolver } from "server/graphql/resolvers.ts";
import type { ServerState } from "server/state.ts";
import { createGqlContext } from "server/graphql/context.ts";

const graphqlLogger = logger.extend("graphql");

export const graphqlHandler = (
  state: ServerState,
): AnimeSkipServerHandler<"/graphql"> => {
  const handleGraphql = loadGraphqlSchema().then((typeDefs) => {
    const schema = makeExecutableSchema({
      resolvers: rootResolver,
      typeDefs,
    });
    return GraphQLHTTP<Request>({
      schema,
      context: (request) => createGqlContext(state, logger, request),
      onOperation: (_req, op) =>
        graphqlLogger.http(op.operationName || "Unnamed Operation"),
    });
  });

  return async (
    ctx,
  ) => {
    const response = await (await handleGraphql)(ctx.request.source!);
    ctx.response.status = response.status;
    ctx.response.body = response.body;
  };
};
