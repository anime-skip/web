import { styleText } from "node:util";

import { createLogger } from "@aklinker1/logger";
import { codegen } from "@graphql-codegen/core";
import type { CodegenPlugin } from "@graphql-codegen/plugin-helpers";
import * as typescriptPlugin from "@graphql-codegen/typescript";
import * as typescriptResolversPlugin from "@graphql-codegen/typescript-resolvers";
import { typeDefs } from "server/graphql/type-defs";
import { createTimer } from "shared/time";

const logger = createLogger("graphql-codegen");

export async function generateGraphqlCode() {
  const typesOutput = "shared/graphql-types.gen.d.ts";
  const resolversOutput = "server/graphql/resolver-types.gen.ts";
  logger.info("Generating GraphQL types...");
  logger.debug(`  - Types:     ${styleText("cyan", "./" + typesOutput)}`);
  logger.debug(`  - Resolvers: ${styleText("cyan", "./" + resolversOutput)}`);
  const codegenTimer = createTimer();

  await generate<typescriptPlugin.TypeScriptPluginConfig>(typesOutput, typescriptPlugin, {
    typesPrefix: "Gql",
    noExport: true,
    enumsAsTypes: true,
    defaultScalarType: "any",
  });
  await generate<typescriptResolversPlugin.TypeScriptResolversPluginConfig>(
    resolversOutput,
    typescriptResolversPlugin,
    {
      contextType: "server/graphql/context.ts#GqlContext",
      useTypeImports: true,
      typesPrefix: "Gql",
      defaultScalarType: "any",
    },
  );

  logger.success("Done", { duration: codegenTimer.duration() });
}

// oxlint-lint-ignore ban-types
async function generate<T extends {}>(
  filename: string,
  plugin: CodegenPlugin,
  config: T,
): Promise<void> {
  const code = await codegen({
    schema: typeDefs,
    config: {},
    documents: [],
    filename,
    plugins: [
      {
        plugin: config,
      },
    ],
    pluginMap: {
      plugin: plugin,
    },
  });

  await Bun.write(filename, `// oxlint-lint-ignore-file\n// prettier-ignore\n${code}`);
}

if (import.meta.main) await generateGraphqlCode();
