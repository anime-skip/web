import { createLogger } from "@aklinker1/logger";
import z from "zod";

import { loadEnvVars } from "./utils/env-utils";

const logger = createLogger("env");

export const Env = z.object({
  NODE_ENV: z.string().default("development").describe("Node environment"),
  LOG_LEVEL: z
    .enum(["debug", "info", "success", "warn", "error", "fatal", "silent"])
    .default("info")
    .describe(
      "Used by `@aklinker1/logger` internally, see it's docs: https://jsr.io/@aklinker1/logger/doc/~/LogLevel",
    ),
  ENABLE_PLAYGROUND: z
    .stringbool()
    .default(true)
    .describe("If the GQL playground is available at /playground"),
  JWT_SECRET: z.string().optional().describe("Secret used to sign JWTs"),
  SEND_EMAILS: z
    .stringbool()
    .default(false)
    .describe("Whether or not to send emails (like when creating accounts)"),
  EMAIL_STMP_HOSTNAME: z
    .string()
    .optional()
    .describe("SMTP server hostname used when sending emails"),
  EMAIL_STMP_PORT: z.coerce
    .number()
    .int()
    .nonnegative()
    .optional()
    .describe("SMTP server port used when sending emails"),
  EMAIL_STMP_USERNAME: z
    .string()
    .optional()
    .describe("SMTP server username used when sending emails"),
  EMAIL_STMP_PASSWORD: z
    .string()
    .optional()
    .describe("SMTP server password used when sending emails"),
  RECAPTCHA_RESPONSE_ALLOWLIST: z
    .string()
    .transform((v) => v.split(","))
    .default([])
    .describe(
      "List of allowed recaptcha responses to bypass the real check, only respected in non-prod environments",
    ),
  RECAPTCHA_SECRET: z.string().optional().describe("Recaptcha secret key"),
  DATABASE_URL: z.string().optional().describe("Postgres connection URL"),
  DATABASE_ENABLE_SEEDING: z
    .stringbool()
    .default(false)
    .describe(
      "Insert the missing rows the API requires (admin user, timestamp types, known API clients) on startup",
    ),
  DISCORD_ALERTS_CHANNEL_ID: z.string().optional().describe("Discord channel ID to post alerts to"),
  DISCORD_BOT_TOKEN: z.string().optional().describe("Token used to authenticate with Discord API"),
  OTEL_EXPORTER_OTLP_ENDPOINT: z
    .string()
    .optional()
    .describe(
      "OTLP/HTTP endpoint to send traces to, e.g. http://alloy:4318. Tracing is disabled if unset",
    ),
  OTEL_SERVICE_NAME: z.string().default("anime-skip-web").describe("Service name shown in Grafana"),
  STAGE: z
    .enum(["production", "test", "development"])
    .default("development")
    .describe("Where the server is running"),
});

logger.info("Loading env vars...");
const loadStart = Date.now();
export const env: z.infer<typeof Env> = Env.parse(await loadEnvVars(Env));
logger.success("Loaded env vars", { durationMs: Date.now() - loadStart });
