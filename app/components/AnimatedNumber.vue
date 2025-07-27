<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
  number: number;
  delay?: number; // Add the new delay prop
  duration?: number; // Add the new duration prop
}>();

const animatedNumber = ref(props.number); // Initialize with the current prop value

let animationFrameId: ReturnType<typeof requestAnimationFrame> | undefined; // To store and cancel the animation frame
let delayTimeoutId: ReturnType<typeof setTimeout> | undefined; // To store and cancel the delay timeout

watch(
  () => props.number,
  (newValue, oldValue) => {
    // If there's an ongoing animation, cancel it to prevent conflicts
    if (animationFrameId != null) {
      cancelAnimationFrame(animationFrameId);
    }
    // If there's an ongoing delay, clear it
    if (delayTimeoutId != null) {
      clearTimeout(delayTimeoutId);
    }

    const startAnimation = () => {
      // Start the animation from the currently displayed value, not the old prop value
      // This ensures smooth transitions even if the prop changes rapidly.
      const startValue = animatedNumber.value;
      const endValue = newValue;
      const duration = props.duration ?? 500; // Use prop.duration or default to 500ms
      let startTime: number | null = null;

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1); // Clamp progress between 0 and 1

        // Apply an ease-out cubic function to the progress
        const easedProgress = 1 - Math.pow(1 - progress, 3);

        // Calculate the interpolated value
        animatedNumber.value = Math.round(
          startValue + (endValue - startValue) * easedProgress,
        );

        if (progress < 1) {
          // Continue the animation if not finished
          animationFrameId = requestAnimationFrame(animate);
        } else {
          // Ensure the final value is exactly the target value
          animatedNumber.value = endValue;
          animationFrameId = undefined; // Clear the animation ID
        }
      };

      // Start the animation frame loop
      animationFrameId = requestAnimationFrame(animate);
    };

    // Apply delay if prop.delay is set and greater than 0
    if (props.delay && props.delay > 0) {
      delayTimeoutId = setTimeout(() => {
        startAnimation();
        delayTimeoutId = undefined; // Clear the timeout ID after it executes
      }, props.delay);
    } else {
      // If no delay, start animation immediately
      startAnimation();
    }
  },
  { immediate: true },
); // 'immediate: true' ensures the watcher runs on component initialization

const formatter = Intl.NumberFormat(undefined, {
  // Uncomment to enable X.XK format
  // notation: "compact",
  // maximumFractionDigits: 1,
});
</script>

<template>
  {{ formatter.format(animatedNumber) }}
</template>
