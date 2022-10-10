import { MaybeRef, toRefs } from '@vueuse/core';
import { getMaybeRefValue } from '~~/utils/maybe-ref';

export default function (value: MaybeRef<number | undefined>, format?: Intl.NumberFormatOptions) {
  const formatter = Intl.NumberFormat('en-US', format);
  return computed(() => {
    const v = getMaybeRefValue(value);
    if (v == null) return undefined;
    return formatter.format(v);
  });
}
