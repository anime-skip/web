import { ref, onUnmounted } from 'vue';

export function useInterval(handler: () => void | Promise<void>, ms: number) {
  const interval = ref<number>();
  function start() {
    if (interval.value != null) return;
    interval.value = window.setInterval(handler, ms);
  }
  function stop() {
    window.clearInterval(interval.value);
  }
  onUnmounted(stop);

  return {
    start,
    stop,
  };
}
