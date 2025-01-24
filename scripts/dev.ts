import { createServer } from "server/server.ts";
import * as vite from "vite";
import { generateGraphqlCode } from "./graphql-codegen.ts";
import { Color, logger } from "server/utils/logger.ts";

await generateGraphqlCode();

const server = await createServer();

const viteServer = await vite.createServer({
  root: "app",
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: server.state.origin,
        changeOrigin: true,
      },
      "/graphql": {
        target: server.state.origin,
        changeOrigin: true,
      },
      "/playground": {
        target: server.state.origin,
        changeOrigin: true,
      },
    },
  },
});

await viteServer.listen();
logger.info(
  `Vite started   @ ${Color.Underline}${Color.Dim}http://localhost:5173${Color.Reset}`,
);
await server.listen({ port: server.state.port });
