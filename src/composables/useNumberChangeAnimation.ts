import { Ref } from 'vue';
import { InterpolateEaseOut, InterpolationFn } from '~~/utils/animation';
import useFpsFn from './useFpsFn';

export default function (
  value: Ref<number>,
  options?: {
    duration?: number;
    interpolate?: InterpolationFn;
  },
) {
  const duration = options?.duration || 1000;
  const interpolate = options?.interpolate ?? InterpolateEaseOut;
  const disableAnimation = usePreferredReducedMotion();

  const animatedValue = ref(value.value);

  const animateStartValue = ref(0);
  const animateStartTime = ref(0);
  const animateEndValue = ref(0);

  const animation = useFpsFn(
    () => {
      const percent = (Date.now() - animateStartTime.value) / duration;
      if (percent >= 1) {
        animation.pause();
        animatedValue.value = Math.floor(animateEndValue.value);
        return;
      }
      animatedValue.value = Math.floor(
        interpolate(animateStartValue.value, animateEndValue.value, percent),
      );
    },
    120,
    { immediate: false },
  );

  watch(value, newValue => {
    if (disableAnimation.value === 'reduce') {
      animatedValue.value = newValue;
    } else {
      animateStartTime.value = Date.now();
      animateStartValue.value = animatedValue.value;
      animateEndValue.value = newValue;
      animation.resume();
    }
  });

  return animatedValue;
}
