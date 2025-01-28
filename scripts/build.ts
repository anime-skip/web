import { copy, emptyDir, ensureDir } from "fs-extra";
import { join } from "node:path";
import { execSync } from "node:child_process";
import { Color } from "server/utils/logger";

const outputDir = ".output";

console.log("Building server...");
await ensureDir(outputDir);
await emptyDir(outputDir);

await copySrc("public");
await copySrc("server");
await copySrc("shared");
await copySrc("package.json");
await copySrc("bun.lock");
await copySrc("tsconfig.json");
await copySrc("version.json");

console.log();
console.log("Building app...");
execSync("vite build app", { stdio: "inherit" });

console.log();
console.log("Done!");
console.log();
console.log(
  `Run ${Color.Cyan}bun preview${Color.Reset} to test out production build`,
);
console.log();

async function copySrc(src: string): Promise<void> {
  const dest = join(outputDir, src);
  await copy(src, dest);
  console.log(
    `  - ${Color.Dim}${src}${Color.Reset} ${Color.Dim}→${Color.Reset} ${Color.Cyan}${dest}${Color.Reset}`,
  );
}
