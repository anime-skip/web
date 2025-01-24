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
  const resolversOutput = "shared/graphql-resolvers.gen.d.ts";
  logger.info("Generating GraphQL types...");
  logger.verbose(
    `  - Types: ${Color.Cyan}./${typesOutput}${Color.Reset}`,
  );
  logger.verbose(
    `  - Resolvers:  ${Color.Cyan}./${resolversOutput}${Color.Reset}`,
  );
  const codegenTimer = createTimer();

  schema = await loadGraphqlSchema();

  await generate<typescriptPlugin.TypeScriptPluginConfig>(
    "shared/graphql-types.gen.d.ts",
    typescriptPlugin,
    {},
  );
  await generate<typescriptResolversPlugin.TypeScriptResolversPluginConfig>(
    "shared/graphql-resolvers.gen.d.ts",
    typescriptResolversPlugin,
    {},
  );
  const outputFile = "shared/graphql-types.gen.d.ts";
  const code = await codegen({
    schema: await loadGraphqlSchema(),
    config: {},
    documents: [],
    filename: outputFile,
    plugins: [
      {
        typescript: {} satisfies typescriptPlugin.TypeScriptPluginConfig,
      },
      {
        typescriptResolvers:
          {} satisfies typescriptResolversPlugin.TypeScriptResolversPluginConfig,
      },
    ],
    pluginMap: {
      typescript: typescriptPlugin,
      typescriptResolvers: typescriptResolversPlugin,
    },
  });

  await Deno.writeTextFile(outputFile, code);

  logger.info("Generated in", codegenTimer.duration());
}

async function generate<T>(
  filename: string,
  plugin: CodegenPlugin<T>,
  config: T,
): Promise<void> {
  const code = await codegen({
    schema,
    config: {},
    documents: [],
    filename,
    plugins: [
      {
        typescript: {} satisfies typescriptPlugin.TypeScriptPluginConfig,
      },
      {
        typescriptResolvers:
          {} satisfies typescriptResolversPlugin.TypeScriptResolversPluginConfig,
      },
    ],
    pluginMap: {
      typescript: typescriptPlugin,
      typescriptResolvers: typescriptResolversPlugin,
    },
  });

  await Deno.writeTextFile(filename, code);
}
