import { loadGraphqlSchema } from "server/assets/graphql/index.ts";
import { codegen } from "@graphql-codegen/core";
import * as typescriptPlugin from "@graphql-codegen/typescript";
import * as typescriptResolversPlugin from "@graphql-codegen/typescript-resolvers";
import { logger } from "server/utils/logger.ts";
import { createTimer } from "shared/time.ts";
import type { CodegenPlugin } from "@graphql-codegen/plugin-helpers";
import type { DocumentNode } from "graphql";
import { Color } from "server/utils/logger.ts";

let schema: DocumentNode;

export async function generateGraphqlCode() {
  const typesOutput = "shared/graphql-types.gen.d.ts";
  const resolversOutput = "server/graphql/resolver-types.gen.ts";
  logger.info("Generating GraphQL types...");
  logger.verbose(
    `  - Types:     ${Color.Cyan}./${typesOutput}${Color.Reset}`,
  );
  logger.verbose(
    `  - Resolvers: ${Color.Cyan}./${resolversOutput}${Color.Reset}`,
  );
  const codegenTimer = createTimer();

  schema = await loadGraphqlSchema();

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
      contextType: "server/state.ts#ServerState",
      useTypeImports: true,
      typesPrefix: "Gql",
    },
  );

  logger.info("Generated in", codegenTimer.duration());
}

// deno-lint-ignore ban-types
async function generate<T extends {}>(
  filename: string,
  plugin: CodegenPlugin,
  config: T,
): Promise<void> {
  const code = await codegen({
    schema,
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

  await Deno.writeTextFile(filename, `// deno-lint-ignore-file\n${code}`);
}

if (import.meta.main) await generateGraphqlCode();
