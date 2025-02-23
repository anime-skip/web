import { defineConfig } from "@aklinker1/aframe";
import { join } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  vite: {
    plugins: [vue(), tailwindcss()],
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
});
