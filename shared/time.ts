export function createTimer() {
  const start = performance.now();
  return {
    duration(): string {
      const end = performance.now();
      return `${(end - start).toFixed(3)}ms`;
    },
  };
}
