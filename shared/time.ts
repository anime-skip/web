export function createTimer() {
  const start = performance.now();
  return {
    duration(): string {
      const end = performance.now();
      return `${(end - start).toFixed(3)}ms`;
    },
  };
}

export const SECOND = 1e3;
export const MINUTE = 60 * SECOND;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;
export const WEEK = 7 * DAY;
export const MONTH = 30 * DAY;

export function toSeconds(ms: number) {
  return Math.floor(ms / SECOND);
}
