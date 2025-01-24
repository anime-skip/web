import { copy, emptyDir, ensureDir } from "@std/fs";
import { join } from "node:path";
import { execSync } from "node:child_process";
import { Color } from "server/utils/logger.ts";

const outputDir = ".output";

console.log("Building server...");
await ensureDir(outputDir);
await emptyDir(outputDir);

await copySrc("public");
await copySrc("server");
await copySrc("shared");
await copySrc("deno.json");
await copySrc("deno.lock");

console.log();
console.log("Building app...");
execSync("deno task build:app", { stdio: "inherit" });

console.log();
console.log("Done!");
console.log();
console.log(
  `Run ${Color.Cyan}deno task preview${Color.Reset} to test out production build`,
);
console.log();

async function copySrc(src: string): Promise<void> {
  const dest = join(outputDir, src);
  await copy(src, dest);
  console.log(
    `  - ${Color.Dim}${src}${Color.Reset} ${Color.Dim}→${Color.Reset} ${Color.Cyan}${dest}${Color.Reset}`,
  );
}
