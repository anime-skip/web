import { loadGraphqlSchema } from "server/assets/graphql/index.ts";
import type { AnimeSkipServerHandler } from "server/types.ts";
import { GraphQLHTTP } from "@deno-libs/gql";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { getDirectives, MapperKind, mapSchema } from "@graphql-tools/utils";
import { logger } from "server/utils/logger.ts";
import { rootResolver } from "server/graphql/resolvers.ts";
import type { ServerState } from "server/state.ts";
import { createGqlContext } from "server/graphql/context.ts";
import { defaultFieldResolver, type GraphQLSchema } from "graphql";
import type { GqlDirectiveResolvers } from "server/graphql/resolver-types.gen.ts";
import { directiveResolvers } from "server/graphql/directives.ts";

const graphqlLogger = logger.extend("graphql");

export const graphqlHandler = (
  state: ServerState,
): AnimeSkipServerHandler<"/graphql"> => {
  const handleGraphql = loadGraphqlSchema().then((typeDefs) => {
    const schema = makeExecutableSchema({
      resolvers: rootResolver,
      typeDefs,
    });
    const schemaWithDirectives = attachDirectiveResolvers(
      schema,
      directiveResolvers,
    );
    return GraphQLHTTP<Request>({
      schema: schemaWithDirectives,
      context: (request) => createGqlContext(state, logger, request),
      onOperation: (_req, op) => {
        graphqlLogger.http(op.operationName || "Unnamed Operation");
      },
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

/** https://the-guild.dev/graphql/tools/docs/schema-directives#what-about-directiveresolvers */
export function attachDirectiveResolvers(
  schema: GraphQLSchema,
  directiveResolvers: GqlDirectiveResolvers,
): GraphQLSchema {
  // ... argument validation ...

  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const newFieldConfig = { ...fieldConfig };

      const directives = getDirectives(schema, fieldConfig);
      for (const directive of directives) {
        const directiveName = directive.name as keyof typeof directiveResolvers;
        if (directiveResolvers[directiveName]) {
          const resolver = directiveResolvers[directiveName];
          const originalResolver = newFieldConfig.resolve != null
            ? newFieldConfig.resolve
            : defaultFieldResolver;
          const directiveArgs = directive.args;
          newFieldConfig.resolve = (source, originalArgs, context, info) => {
            return resolver(
              () =>
                new Promise((resolve, reject) => {
                  const result = originalResolver(
                    source,
                    originalArgs,
                    context,
                    info as any,
                  );
                  if (result instanceof Error) {
                    reject(result);
                  }
                  resolve(result);
                }),
              source,
              directiveArgs as any,
              context,
              info as any,
            );
          };
        }
      }

      return newFieldConfig;
    },
  });
}
