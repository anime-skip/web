import { walk } from "@std/fs";
import gql from "graphql-tag";
import type { DocumentNode } from "graphql";

export async function loadGraphqlSchema(): Promise<DocumentNode> {
  const files = await Array.fromAsync(walk("server/assets/graphql"));
  const schemaContents = await Promise.all(
    files.map(async (file) => {
      if (file.isFile && file.name.endsWith(".gql")) {
        return await Deno.readTextFile(file.path);
      }
      return "";
    }),
  );

  // deno-lint-ignore no-explicit-any
  return (gql as any)(schemaContents.filter(Boolean).join("\n\n"));
}
