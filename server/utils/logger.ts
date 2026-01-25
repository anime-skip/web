// oxlint-lint-ignore-file no-explicit-any

export interface Logger {
  debug(...args: any[]): void;
  verbose(...args: any[]): void;
  info(...args: any[]): void;
  http(...args: any[]): void;
  warn(...args: any[]): void;
  error(...args: any[]): void;
  extend(namespace: string): Logger;
}

export enum LogLevel {
  Debug,
  Verbose,
  Info,
  Http,
  Warn,
  Error,
}
const LOG_LEVEL_MAP = {
  debug: LogLevel.Debug,
  verbose: LogLevel.Verbose,
  info: LogLevel.Info,
  http: LogLevel.Http,
  warn: LogLevel.Warn,
  error: LogLevel.Error,
};
type LogLevelName = keyof typeof LOG_LEVEL_MAP;

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

const levelName = import.meta.env.AS_LOG_LEVEL as LogLevelName;
const level = LOG_LEVEL_MAP[levelName] ?? LogLevel.Info;

function createLogger(namespace?: string): Logger {
  const log = (levelName: LogLevelName, color: string, args: any[]) => {
    if (LOG_LEVEL_MAP[levelName] < level) return;

    const label = levelName.padEnd(7, " ");
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
    debug: (...args) => log("debug", Color.Dim, args),
    verbose: (...args) => log("verbose", Color.Cyan, args),
    info: (...args) => log("info", Color.Blue, args),
    http: (...args) => log("http", Color.Purple, args),
    warn: (...args) => log("warn", Color.Yellow, args),
    error: (...args) => log("error", Color.Red, args),
    extend: (label) =>
      createLogger(namespace ? `${namespace}:${label}` : label),
  };
}

export const logger = createLogger();
