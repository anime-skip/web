import { context, trace } from "@opentelemetry/api";
import type { SQL } from "bun";

import { SpanKind, tracer, recordError } from "./telemetry";

/**
 * Wrap a Bun `SQL` client so every `unsafe(query, params)` call (what Drizzle uses) produces a
 * CLIENT span. Transactions and savepoints hand out new clients, which are wrapped as well so
 * queries inside them are traced as children of the active span.
 *
 * Only the SQL text is recorded, never the parameters (they can contain passwords and PII).
 */
export function traceSqlClient<T extends SQL>(client: T): T {
  return new Proxy(client, {
    get(target, prop) {
      const value = Reflect.get(target, prop, target);
      if (typeof value !== "function") return value;

      if (prop === "unsafe") {
        return (query: string, ...rest: unknown[]) => traceQuery(target, query, rest);
      }
      if (prop === "begin" || prop === "savepoint" || prop === "transaction") {
        return (...args: any[]) => {
          const callback = args.pop();
          return value.call(target, ...args, (inner: T, ...cbRest: unknown[]) =>
            callback(traceSqlClient(inner), ...cbRest),
          );
        };
      }
      return value.bind(target);
    },
  });
}

/**
 * Bun queries are lazy thenables. The query only runs once `.then`/`.values()` is called, so the
 * span starts when execution is requested rather than when `unsafe` is called.
 */
function traceQuery(target: any, query: string, rest: unknown[]) {
  const operation = query.trimStart().split(/\s+/, 1)[0]?.toUpperCase() || "QUERY";
  const parentContext = context.active();

  const run = <R>(execute: () => PromiseLike<R>): Promise<R> => {
    const span = tracer.startSpan(
      operation,
      {
        kind: SpanKind.CLIENT,
        attributes: {
          "db.system.name": "postgresql",
          "db.operation.name": operation,
          "db.query.text": query,
        },
      },
      parentContext,
    );
    return context.with(trace.setSpan(parentContext, span), () =>
      Promise.resolve(execute()).then(
        (result) => {
          span.end();
          return result;
        },
        (error) => {
          recordError(span, error);
          span.end();
          throw error;
        },
      ),
    );
  };

  const raw = target.unsafe(query, ...rest);
  return new Proxy(raw, {
    get(rawTarget, prop) {
      if (prop === "then") {
        return (onFulfilled?: any, onRejected?: any) =>
          run(() => rawTarget).then(onFulfilled, onRejected);
      }
      if (prop === "values") {
        return () => {
          const valuesQuery = rawTarget.values();
          return new Proxy(valuesQuery, {
            get(vTarget, vProp) {
              if (vProp === "then") {
                return (onFulfilled?: any, onRejected?: any) =>
                  run(() => vTarget).then(onFulfilled, onRejected);
              }
              const v = Reflect.get(vTarget, vProp, vTarget);
              return typeof v === "function" ? v.bind(vTarget) : v;
            },
          });
        };
      }
      const value = Reflect.get(rawTarget, prop, rawTarget);
      return typeof value === "function" ? value.bind(rawTarget) : value;
    },
  });
}
