import { SpanKind, SpanStatusCode, withSpan } from "./telemetry";

/** `fetch` wrapped in a CLIENT span. Query strings are never recorded (they can contain secrets). */
export function tracedFetch(url: string | URL, init: RequestInit = {}): Promise<Response> {
  const parsed = new URL(url);
  const method = init.method ?? "GET";
  return withSpan(
    `${method} ${parsed.host}`,
    {
      kind: SpanKind.CLIENT,
      attributes: {
        "http.request.method": method,
        "server.address": parsed.host,
        "url.full": `${parsed.origin}${parsed.pathname}`,
      },
    },
    async (span) => {
      const response = await fetch(url, init);
      span.setAttribute("http.response.status_code", response.status);
      if (!response.ok) {
        span.setStatus({ code: SpanStatusCode.ERROR, message: `HTTP ${response.status}` });
      }
      return response;
    },
  );
}
