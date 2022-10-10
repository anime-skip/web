import { MaybeRef } from '@vueuse/core';

export function getMaybeRefValue<T>(maybeRef: MaybeRef<T>): T {
  return isRef(maybeRef) ? maybeRef.value : maybeRef;
}
