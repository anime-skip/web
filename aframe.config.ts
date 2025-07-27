import { defineConfig } from "@aklinker1/aframe";
import { join } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import { compression } from "vite-plugin-compression2";
import markdown from "unplugin-vue-markdown/vite";

export default defineConfig({
  vite: {
    plugins: [
      vue({
        include: [/\.vue$/, /\.md$/],
      }),
      tailwindcss(),
      compression({
        exclude: [/\.html$/],
      }),
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
  prerenderer: {
    rendererOptions: {
      renderAfterElementExists: "#prerenderer-target",
    },
  },
});
