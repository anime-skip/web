import { merge } from "@es-toolkit/es-toolkit";

export function todo(message?: string): never {
  throw Error(message ? `TODO: ${message}` : "TODO");
}

export function notImplemented(fn: string) {
  throw Error("Not implemented: " + fn);
}

/** Merge multiple objects into one. Later objects override values of earlier objects */
export function mergeAll<T extends Record<PropertyKey, unknown>>(
  ...objects: T[]
): T {
  if (objects.length === 0) {
    return {} as T;
  }
  if (objects.length === 1) {
    return objects[0];
  }
  return objects.reduce((acc, obj) => merge(acc ?? {}, obj));
}
