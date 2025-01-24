import { defineConfig } from "vite";
import { join } from "node:path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // deno-lint-ignore no-explicit-any
  plugins: [tailwindcss() as any],
  publicDir: join(__dirname, "../public"),
  resolve: {
    alias: {
      "app/": __dirname,
      "shared/": join(__dirname, "../shared"),
      "worker/": join(__dirname, "../worker"),
    },
  },
  build: {
    outDir: join(__dirname, "../.output/public"),
    emptyOutDir: false,
    copyPublicDir: false,
  },
});
