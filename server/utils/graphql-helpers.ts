import { getDirectives, MapperKind, mapSchema } from "@graphql-tools/utils";
import { defaultFieldResolver, type GraphQLSchema } from "graphql";
import type { GqlDirectiveResolvers } from "server/graphql/resolver-types.gen";

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
