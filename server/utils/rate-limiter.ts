export function createRateLimiter() {
  const history: { [key: string]: number[] | undefined } = {};

  return (key: string, rate: number, duration: number) => {
    const now = Date.now();
    const start = now - (now % duration);
    const end = start + duration;

    const recentRequests = (history[key] ?? []).concat(now);
    const relevantRequests = recentRequests.filter((time) => time >= start);
    history[key] = relevantRequests;

    return {
      resetAt: new Date(end),
      total: rate,
      remaining: rate - relevantRequests.length,
    };
  };
}
