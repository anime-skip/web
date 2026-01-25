import {
  boolean,
  enumValue,
  requireString,
  stringArray,
} from "shared/env-utils";
import { LogLevel } from "./enums";

export const env = {
  /**
   * Controls what logs show. Can be any of:
   * - `"debug"`
   * - `"verbose"`
   * - `"info"`
   * - `"http"`
   * - `"warn"`
   * - `"error"`
   * @default "info"
   */
  LOG_LEVEL: enumValue(
    "LOG_LEVEL",
    {
      debug: LogLevel.Debug,
      verbose: LogLevel.Verbose,
      info: LogLevel.Info,
      http: LogLevel.Http,
      warn: LogLevel.Warn,
      error: LogLevel.Error,
    },
    LogLevel.Info,
  ),
  /**
   * Control whether or not show admins are disabled.
   * @default true
   */
  IS_SHOW_ADMIN_DISABLED: boolean("IS_SHOW_ADMIN_DISABLED", true),
  /**
   * If GQL introspection should be enabled.
   * @default true
   */
  ENABLE_INTROSPECTION: boolean("ENABLE_INTROSPECTION", true),
  /**
   * If GQL playground should be enabled.
   * @default true
   */
  ENABLE_PLAYGROUND: boolean("ENABLE_PLAYGROUND", true),
  /**
   * Secret used to sign JWTs.
   */
  JWT_SECRET: requireString("JWT_SECRET"),

  /**
   * Whether or not to send emails (like when creating accounts).
   * @default false
   */
  SEND_EMAILS: boolean("SEND_EMAILS"),
  /**
   * SMTP server username used when sending emails.
   */
  EMAIL_STMP_USERNAME: requireString("EMAIL_STMP_USERNAME"),
  /**
   * SMTP server password used when sending emails.
   */
  EMAIL_STMP_PASSWORD: requireString("EMAIL_STMP_PASSWORD"),
  /**
   * List of allowed recaptcha responses.
   *
   * > ONLY FOR DEV/TESTING ENVIRONMENTS.
   *
   * @default []
   */
  RECAPTCHA_RESPONSE_ALLOWLIST: stringArray("RECAPTCHA_RESPONSE_ALLOWLIST"),
  /**
   * Recaptcha secret key.
   */
  RECAPTCHA_SECRET: requireString("RECAPTCHA_SECRET"),

  /**
   * Postgres connection URL.
   */
  DATABASE_URL: requireString("DATABASE_URL"),

  /**
   * Used to post alerts to.
   */
  DISCORD_ALERTS_CHANNEL_ID: requireString("DISCORD_ALERTS_CHANNEL_ID"),
  /**
   * Token used to authenticate with Discord API.
   */
  DISCORD_BOT_TOKEN: requireString("DISCORD_BOT_TOKEN"),
};
