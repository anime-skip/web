import Elysia from "elysia";
import { models } from "server/plugins/models";
import { version } from "shared/app";

export const statusRoute = new Elysia()
  .use(models)
  .get("/status", () => ({ status: "UP" as const, version }), {
    response: "GetStatusResponse",
    detail: {
      description: "Check on the server's status.",
      tags: ["HTTP Endpoints"],
    },
  });
