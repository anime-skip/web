export function createPrerenderStub<T extends Record<string, any>>(): T {
  return new Proxy({} as T, {
    get(_target, prop) {
      throw Error(`${String(prop)} is not available while prerendering`);
    },
  });
}
