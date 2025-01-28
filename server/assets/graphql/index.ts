import { readdir } from "fs-extra";
import gql from "graphql-tag";
import type { DocumentNode } from "graphql";
import { join } from "node:path";

export async function loadGraphqlSchema(): Promise<DocumentNode> {
  const graphqlSchemaDir = "server/assets/graphql";
  const files = await readdir("server/assets/graphql");
  const schemaContents = await Promise.all(
    files.map(async (file) => {
      if (file.endsWith(".gql")) {
        return await Bun.file(join(graphqlSchemaDir, file)).text();
      }
      return "";
    }),
  );

  // oxlint-lint-ignore no-explicit-any
  return (gql as any)(schemaContents.filter(Boolean).join("\n\n"));
}
