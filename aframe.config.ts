import { defineConfig } from "@aklinker1/aframe";
import { join } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import markdown from "unplugin-vue-markdown/vite";

export default defineConfig({
  proxyPaths: ["/api", "/openapi.json", "/scalar"],
  vite: {
    plugins: [
      vue({
        include: [/\.vue$/, /\.md$/],
      }),
      tailwindcss(),
      markdown({
        headEnabled: true,
      }),
    ],
    resolve: {
      alias: {
        app: join(__dirname, "app"),
        shared: join(__dirname, "shared"),
        worker: join(__dirname, "worker"),
      },
    },
  },
});
