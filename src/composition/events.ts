import { onMounted, onUnmounted } from 'vue';

export function useWindowEvent<K extends keyof WindowEventMap>(
  type: K,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  listener: (this: Window, ev: WindowEventMap[K]) => any,
): void {
  onMounted(() => {
    window.addEventListener(type, listener);
  });
  onUnmounted(() => {
    window.removeEventListener(type, listener);
  });
}