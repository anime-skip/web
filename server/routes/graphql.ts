import type { Resolvers } from "shared/graphql-resolvers.gen.d.ts";
import { loadGraphqlSchema } from "server/assets/graphql/index.ts";
import type { AnimeSkipServerHandler } from "server/types.ts";
import { GraphQLHTTP } from "@deno-libs/gql";
import { makeExecutableSchema } from "@graphql-tools/schema";

const resolvers: Resolvers = {};

const handleGraphql = loadGraphqlSchema().then((typeDefs) => {
  const schema = makeExecutableSchema({ resolvers, typeDefs });
  return GraphQLHTTP<Request>({ schema });
});

export const graphqlHandler: AnimeSkipServerHandler<"/graphql"> = async (
  ctx,
) => {
  const response = await (await handleGraphql)(ctx.request.source!);
  ctx.response.with(response);
};
