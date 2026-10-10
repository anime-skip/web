import z from "zod";

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
});

export const env: z.infer<typeof Env> = Env.parse(process.env);
