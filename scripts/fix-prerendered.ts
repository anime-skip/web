import { join } from "node:path";

/**
 * Vite's runtime modulepreload links get serialized into the prerendered HTML with the prerender
 * server's origin (`http://localhost:3000`). Strip the origin so assets load from the real host.
 *
 * Aframe has no hook after prerendering, so this runs after `aframe build`.
 */
import { Glob } from "bun";

const dir = join(import.meta.dir, "../.output/prerendered");
const origin = /https?:\/\/(?:localhost|127\.0\.0\.1):\d+(?=\/)/g;

for await (const path of new Glob("**/*.html").scan({ cwd: dir, absolute: true })) {
  const html = await Bun.file(path).text();
  const fixed = html.replace(origin, "");
  if (fixed === html) continue;
  await Bun.write(path, fixed);
  await Bun.write(`${path}.gz`, Bun.gzipSync(fixed));
  console.log(`Removed localhost origin from ${path}`);
}
