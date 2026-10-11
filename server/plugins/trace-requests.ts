import { createApp } from "@aklinker1/zeta";
import { trace } from "@opentelemetry/api";
import {
  enterContext,
  extractContext,
  recordError,
  SpanKind,
  SpanStatusCode,
  tracer,
} from "server/utils/telemetry";

/**
 * Starts a SERVER span for every request. `onGlobalRequest` runs synchronously in the same call
 * chain as the handler, so entering the context there makes the span the parent of everything the
 * handler does (resolvers, DB queries, fetches).
 */
export const traceRequests = createApp()
  .onGlobalRequest(({ request, method, path }) => {
    const parent = extractContext(request.headers);
    const span = tracer.startSpan(
      `${method} ${path}`,
      {
        kind: SpanKind.SERVER,
        attributes: {
          "http.request.method": method,
          "url.path": path,
          "user_agent.original": request.headers.get("user-agent") ?? undefined,
        },
      },
      parent,
    );
    enterContext(trace.setSpan(parent, span));
    return { span };
  })
  .onTransform(({ span, route, method }) => {
    // Low-cardinality name once the route is known
    span.updateName(`${method} ${route}`);
    span.setAttribute("http.route", route);
  })
  .onGlobalError(({ span, error }) => {
    recordError(span, error);
  })
  .onGlobalAfterResponse(({ span, response, set }) => {
    const status = response.status ?? set.status;
    span.setAttribute("http.response.status_code", status);
    if (status >= 500) span.setStatus({ code: SpanStatusCode.ERROR });
    span.end();
  })
  .export();
