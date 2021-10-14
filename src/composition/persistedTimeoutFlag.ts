import { onMounted, onUnmounted, ref } from 'vue';

const STORAGE_PREFIX = 'persisted_timeout_flag__';

function key(label: string): string {
  return STORAGE_PREFIX + label;
}

/**
 * Setups up a flag that works between sessions using `localStorage`, it gets set to true when the
 * timeout is started, and false after it's finished
 */
export function usePersistedTimeoutFlag(label: string, timeoutMs: number) {
  const storageKey = key(label);

  const getExpiresAtFromStorage = () => {
    const str = localStorage.getItem(storageKey);
    const parsed = Number(str);
    return isNaN(parsed) ? undefined : parsed;
  };

  const expiresAt = ref<number | undefined>(getExpiresAtFromStorage());

  const flag = ref<boolean>(!!expiresAt.value && expiresAt.value >= Date.now());
  onMounted(() => {
    if (!flag.value) {
      localStorage.removeItem(storageKey);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      timeout.value = window.setTimeout(stopTimeout, expiresAt.value! - Date.now());
    }
  });

  const timeout = ref();
  function startTimeout() {
    stopTimeout();
    flag.value = true;
    localStorage.setItem(storageKey, String(Date.now() + timeoutMs));
    timeout.value = window.setTimeout(stopTimeout, timeoutMs);
  }

  function stopTimeout() {
    flag.value = false;
    localStorage.removeItem(storageKey);
    window.clearTimeout(timeout.value);
  }

  onUnmounted(() => window.clearTimeout(timeout.value));

  return {
    flag,
    startTimeout,
    stopTimeout,
  };
}
