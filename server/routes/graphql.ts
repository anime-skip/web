import { loadGraphqlSchema } from "server/assets/graphql/index.ts";
import type { AnimeSkipServerHandler } from "server/types.ts";
import { GraphQLHTTP } from "@deno-libs/gql";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { logger } from "server/utils/logger.ts";
import { rootResolver } from "server/graphql/resolvers.ts";
import type { ServerState } from "server/state.ts";

const graphqlLogger = logger.extend("graphql");

export const graphqlHandler = (
  context: ServerState,
): AnimeSkipServerHandler<"/graphql"> => {
  const handleGraphql = loadGraphqlSchema().then((typeDefs) => {
    const schema = makeExecutableSchema({
      resolvers: rootResolver,
      typeDefs,
    });
    return GraphQLHTTP<Request>({
      schema,
      context: {
        ...context,
        // @ts-ignore: Bad typing
        logger: graphqlLogger,
      },
      onOperation: (_req, op) => {
        graphqlLogger.http(op.operationName || "Unknown");
      },
    });
  });

  return async (
    ctx,
  ) => {
    const response = await (await handleGraphql)(ctx.request.source!);
    ctx.response.with(response);
  };
};
