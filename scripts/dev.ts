import { createServer } from "server/server.ts";
import { generateGraphqlCode } from "./graphql-codegen.ts";

await generateGraphqlCode();
const server = await createServer();
await server.listen({ port: server.state.port });
