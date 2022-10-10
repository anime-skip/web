import { Fn, UseRafFnOptions } from '@vueuse/core';

/**
 * A wrapper around `useRafFn` from `@vueuse/core`, this runs the callback `fn` x times a second using request animtation frame
 */
export default function (fn: Fn, fps: number, options?: UseRafFnOptions) {
  const throttledFn = useThrottleFn(fn, Math.floor(1000 / fps));
  return useRafFn(throttledFn, options);
}
