import { copy, emptyDir, ensureDir } from "@std/fs";
import { join } from "node:path";
import { execSync } from "node:child_process";
import { Color } from "server/utils/logger.ts";
import * as vite from "vite";

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
console.log("Rendering SSR pages...");
const viteServer = await vite.createServer({ root: "app" });
await viteServer.listen();
await renderPage(viteServer, "/", join(outputDir, "public/home.html"));
await viteServer.close();

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

async function renderPage(
  server: vite.ViteDevServer,
  path: string,
  filename: string,
) {
  const res = await fetch(`http://localhost:5173${path}`);
  const html = await res.text();
  await Deno.writeTextFile(filename, html);
  console.log(
    `  - ${Color.Dim}/${Color.Reset} ${Color.Dim}→${Color.Reset} ${Color.Cyan}.output/public/home.html${Color.Reset}`,
  );
}
