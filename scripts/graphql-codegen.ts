import { typeDefs } from "server/graphql/type-defs";
import { codegen } from "@graphql-codegen/core";
import * as typescriptPlugin from "@graphql-codegen/typescript";
import * as typescriptResolversPlugin from "@graphql-codegen/typescript-resolvers";
import { logger } from "server/utils/logger";
import { createTimer } from "shared/time";
import type { CodegenPlugin } from "@graphql-codegen/plugin-helpers";
import { Color } from "server/utils/logger";

const codegenLogger = logger.extend("graphql-codegen");

export async function generateGraphqlCode() {
  const typesOutput = "shared/graphql-types.gen.d.ts";
  const resolversOutput = "server/graphql/resolver-types.gen.ts";
  codegenLogger.info("Generating GraphQL types...");
  codegenLogger.verbose(
    `  - Types:     ${Color.Cyan}./${typesOutput}${Color.Reset}`,
  );
  codegenLogger.verbose(
    `  - Resolvers: ${Color.Cyan}./${resolversOutput}${Color.Reset}`,
  );
  const codegenTimer = createTimer();

  await generate<typescriptPlugin.TypeScriptPluginConfig>(
    typesOutput,
    typescriptPlugin,
    {
      typesPrefix: "Gql",
      noExport: true,
      enumsAsTypes: true,
    },
  );
  await generate<typescriptResolversPlugin.TypeScriptResolversPluginConfig>(
    resolversOutput,
    typescriptResolversPlugin,
    {
      contextType: "server/graphql/context.ts#GqlContext",
      useTypeImports: true,
      typesPrefix: "Gql",
    },
  );

  codegenLogger.info("Generated in", codegenTimer.duration());
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

  await Bun.write(
    filename,
    `// oxlint-lint-ignore-file\n// prettier-ignore\n${code}`,
  );
}

if (import.meta.main) await generateGraphqlCode();
