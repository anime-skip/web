import { createApp } from "@aklinker1/zeta";
import dedent from "dedent";
import { OpenApiTag } from "server/enums";
import { env } from "server/env";
import { OpenApiSecurity } from "server/utils/openapi";
import { HealthCheckOutput } from "shared/models";
import { version } from "shared/version";

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
    status: "RUNNING" as const,
    version,
    stage: env.NODE_ENV,
    introspection: true,
    playground: env.ENABLE_PLAYGROUND,
  }),
);
