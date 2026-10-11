import { getDirectives, MapperKind, mapSchema } from "@graphql-tools/utils";
import { defaultFieldResolver, type GraphQLSchema } from "graphql";
import type { GqlDirectiveResolvers } from "server/graphql/resolver-types.gen";

import { SpanKind, withSpan } from "./telemetry";

/**
 * Wrap every field that has a real resolver (not the default property lookup) in a span, so nested
 * resolvers that hit the DB show up as children of their parent field.
 */
export function traceResolvers(schema: GraphQLSchema): GraphQLSchema {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig, fieldName, typeName) => {
      const resolve = fieldConfig.resolve;
      if (!resolve || typeName.startsWith("__")) return fieldConfig;
      return {
        ...fieldConfig,
        resolve: (source, args, context, info) =>
          withSpan(
            `graphql.resolve ${typeName}.${fieldName}`,
            {
              kind: SpanKind.INTERNAL,
              attributes: {
                "graphql.field.name": fieldName,
                "graphql.field.parent_type": typeName,
                "graphql.field.path": pathToString(info.path),
              },
            },
            () => resolve(source, args, context, info),
          ),
      };
    },
  });
}

function pathToString(path: { prev?: any; key: string | number }): string {
  const keys: Array<string | number> = [];
  for (let p: typeof path | undefined = path; p; p = p.prev) {
    if (typeof p.key === "string") keys.unshift(p.key);
  }
  return keys.join(".");
}

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
            newFieldConfig.resolve != null ? newFieldConfig.resolve : defaultFieldResolver;
          const directiveArgs = directive.args;
          newFieldConfig.resolve = (source, originalArgs, context, info) => {
            return resolver(
              () =>
                new Promise((resolve, reject) => {
                  const result = originalResolver(source, originalArgs, context, info);
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
