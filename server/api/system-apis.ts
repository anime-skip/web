import { createApp } from "@aklinker1/zeta";
import dedent from "dedent";
import { OpenApiTag } from "server/enums";
import { OpenApiSecurity } from "server/utils/openapi";
import { version } from "shared/version";
import { HealthCheckOutput } from "shared/models";

export const systemApis = createApp().get(
  "/health",
  {
    operationId: "healthCheck",
    summary: "Health Check",
    description: dedent`
      Check on the server's status.
    `,
    tags: [OpenApiTag.System],
    security: [OpenApiSecurity.XClientId],
    responses: HealthCheckOutput,
  },
  () => ({
    status: "UP" as const,
    version,
  }),
);
