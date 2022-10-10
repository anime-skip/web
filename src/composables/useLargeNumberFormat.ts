import { MaybeRef } from '@vueuse/core';

export default function (value: MaybeRef<number | undefined>) {
  return useNumberFormat(value, {
    notation: 'compact',
    maximumFractionDigits: 1,
  });
}
