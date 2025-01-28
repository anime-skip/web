import type { AnimeSkipServerHandler } from "server/types";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { getDirectives, MapperKind, mapSchema } from "@graphql-tools/utils";
import { rootResolver } from "server/graphql/resolvers";
import { createGqlContext } from "server/graphql/context";
import { defaultFieldResolver, graphql, type GraphQLSchema } from "graphql";
import type { GqlDirectiveResolvers } from "server/graphql/resolver-types.gen";
import { directiveResolvers } from "server/graphql/directives";
import { typeDefs } from "server/graphql/type-defs";

const schema: GraphQLSchema = attachDirectiveResolvers(
  makeExecutableSchema({
    resolvers: rootResolver,
    typeDefs: typeDefs,
  }),
  directiveResolvers,
);

export const graphqlHandler: AnimeSkipServerHandler<"/graphql"> = async (
  ctx,
) => {
  const {
    operationName = "Unknown",
    query,
    variables,
  } = await ctx.request.body.json();

  ctx.state.logger.info("Evaluating GraphQL:", operationName);

  const response = await graphql({
    schema,
    source: query,
    contextValue: createGqlContext(ctx),
    variableValues: variables,
    operationName: operationName,
  });

  ctx.response.status = 200;
  ctx.response.body = response;
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
          const originalResolver =
            newFieldConfig.resolve != null
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
                    info,
                  );
                  if (result instanceof Error) {
                    reject(result);
                  }
                  resolve(result);
                }),
              source,
              directiveArgs as any,
              context,
              info,
            );
          };
        }
      }

      return newFieldConfig;
    },
  });
}
