// Main entrypoint ran in production
import { createServer } from "server/server.ts";

const server = await createServer();
await server.listen({ port: server.state.port });
