// oxlint-lint-ignore-file no-explicit-any

import { LogLevel } from "server/enums";
import { env } from "server/env";

export interface Logger {
  debug(...args: any[]): void;
  verbose(...args: any[]): void;
  info(...args: any[]): void;
  http(...args: any[]): void;
  warn(...args: any[]): void;
  error(...args: any[]): void;
  extend(namespace: string): Logger;
}

export const Color = {
  Reset: "\x1b[0m",
  Dim: "\x1b[2m",
  Underline: "\x1b[4m",
  Red: "\x1b[31m",
  Green: "\x1b[32m",
  Yellow: "\x1b[33m",
  Blue: "\x1b[34m",
  Purple: "\x1b[35m",
  Cyan: "\x1b[36m",
};

const level = env.LOG_LEVEL;

function createLogger(namespace?: string): Logger {
  const log = (logLevel: LogLevel, color: string, args: any[]) => {
    if (logLevel < level) return;

    const label = LogLevel[logLevel].padEnd(7, " ");
    if (namespace) {
      console.log(
        `${color}${label}${Color.Reset}`,
        `${Color.Dim}${namespace}${Color.Reset}`,
        ...args,
      );
    } else {
      console.log(`${color}${label}${Color.Reset}`, ...args);
    }
  };
  return {
    debug: (...args) => log(LogLevel.Debug, Color.Dim, args),
    verbose: (...args) => log(LogLevel.Verbose, Color.Cyan, args),
    info: (...args) => log(LogLevel.Info, Color.Blue, args),
    http: (...args) => log(LogLevel.Http, Color.Purple, args),
    warn: (...args) => log(LogLevel.Warn, Color.Yellow, args),
    error: (...args) => log(LogLevel.Error, Color.Red, args),
    extend: (label) =>
      createLogger(namespace ? `${namespace}:${label}` : label),
  };
}

export const logger = createLogger();
