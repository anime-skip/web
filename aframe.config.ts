import { defineConfig } from "@aklinker1/aframe";
import { join } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import { compression } from "vite-plugin-compression2";

export default defineConfig({
  vite: {
    plugins: [
      vue(),
      tailwindcss(),
      compression({
        exclude: [/\.html$/],
      }),
    ],
    server: {
      proxy: {
        "/graphql": {
          target: "http://localhost:3001",
          changeOrigin: true,
        },
        "/playground": {
          target: "http://localhost:3001",
          changeOrigin: true,
        },
      },
    },
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
