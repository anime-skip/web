import { defineConfig } from "vite";
import { join } from "node:path";

export default defineConfig({
  publicDir: join(__dirname, "../public"),
  build: {
    outDir: join(__dirname, "../.output/public"),
    emptyOutDir: false,
    copyPublicDir: false,
    rollupOptions: {
      input: [
        join(__dirname, "index.html"),
        join(__dirname, "home.html"),
      ],
    },
  },
});
