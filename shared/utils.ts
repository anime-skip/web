import { merge } from "@es-toolkit/es-toolkit";

// @ts-types="@types/md5"
export { default as md5 } from "md5";

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

export function randomString(length: number): string {
  const letters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  let result = "";
  for (let i = 0; i < length; i++) {
    result += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  return result;
}
