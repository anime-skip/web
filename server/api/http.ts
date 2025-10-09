import { createApp } from "@aklinker1/zeta";
import dedent from "dedent";
import { OpenApiSecurity, OpenApiTag } from "server/openapi";
import { version } from "shared/app";
import { GetStatusOutput } from "shared/models";

export const httpApp = createApp().get(
  "/status",
  {
    operationId: "getStatus",
    summary: "Get Status",
    description: dedent`
      Check on the server's status.
    `,
    tags: [OpenApiTag.Http],
    security: [OpenApiSecurity.XClientId],
    responses: GetStatusOutput,
  },
  () => ({
    status: "UP" as const,
    version,
  }),
);
