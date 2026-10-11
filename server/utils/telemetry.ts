import { createLogger } from "@aklinker1/logger";
import {
  context,
  propagation,
  SpanKind,
  SpanStatusCode,
  trace,
  type Attributes,
  type Context,
  type Span,
} from "@opentelemetry/api";
import { AsyncLocalStorageContextManager } from "@opentelemetry/context-async-hooks";
import { W3CTraceContextPropagator } from "@opentelemetry/core";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { resourceFromAttributes } from "@opentelemetry/resources";
import { BasicTracerProvider, BatchSpanProcessor } from "@opentelemetry/sdk-trace-base";
import { ATTR_SERVICE_NAME } from "@opentelemetry/semantic-conventions";
import { env } from "server/env";

export { SpanKind, SpanStatusCode };

const logger = createLogger("telemetry");

/** Context manager that lets a hook make a span active for the rest of the current async chain. */
class EnterableContextManager extends AsyncLocalStorageContextManager {
  enterWith(ctx: Context): void {
    (this as any)._asyncLocalStorage.enterWith(ctx);
  }
}

const contextManager = new EnterableContextManager();
let provider: BasicTracerProvider | undefined;

/**
 * Register the global tracer provider. Safe to call multiple times, and a no-op when
 * `OTEL_EXPORTER_OTLP_ENDPOINT` isn't set. Must be called once per thread (main and workers).
 */
export function initTelemetry(): void {
  if (!env.OTEL_EXPORTER_OTLP_ENDPOINT) {
    logger.info("Open telemetry is not enabled");
    return;
  }

  if (provider) return;

  logger.info("Initializing telemetry");
  provider = new BasicTracerProvider({
    resource: resourceFromAttributes({
      [ATTR_SERVICE_NAME]: env.OTEL_SERVICE_NAME,
      "deployment.environment.name": env.STAGE,
    }),
    spanProcessors: [
      new BatchSpanProcessor(
        new OTLPTraceExporter({
          url: `${env.OTEL_EXPORTER_OTLP_ENDPOINT.replace(/\/$/, "")}/v1/traces`,
        }),
      ),
    ],
  });
  context.setGlobalContextManager(contextManager.enable());
  propagation.setGlobalPropagator(new W3CTraceContextPropagator());
  trace.setGlobalTracerProvider(provider);

  process.once("SIGTERM", () => void provider?.shutdown());
}

export function flushTelemetry(): Promise<void> {
  return provider?.forceFlush() ?? Promise.resolve();
}

export const tracer = trace.getTracer("anime-skip-web");

/** Make `ctx` the active context for the remainder of the current synchronous call chain. */
export function enterContext(ctx: Context): void {
  if (provider) contextManager.enterWith(ctx);
}

/** Extract a parent context from incoming request headers (`traceparent`). */
export function extractContext(headers: Headers): Context {
  return propagation.extract(context.active(), Object.fromEntries(headers.entries()));
}

export function recordError(span: Span, error: unknown): void {
  span.recordException(error instanceof Error ? error : String(error));
  span.setStatus({
    code: SpanStatusCode.ERROR,
    message: error instanceof Error ? error.message : String(error),
  });
}

/** Run `fn` inside a new child span of the active span, ending it when `fn` settles. */
export function withSpan<T>(
  name: string,
  options: { kind?: SpanKind; attributes?: Attributes },
  fn: (span: Span) => T | Promise<T>,
): Promise<T> {
  return tracer.startActiveSpan(name, options, async (span) => {
    try {
      return await fn(span);
    } catch (error) {
      recordError(span, error);
      throw error;
    } finally {
      span.end();
    }
  });
}
