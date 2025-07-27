import { useLocalStorage } from "@vueuse/core";
import { computed } from "vue";

export default function () {
  const isExtensionInstalled = useLocalStorage(
    "@anime-skip/extensionInstalled",
    false,
  );

  document.addEventListener("@anime-skip/install-check", () => {
    isExtensionInstalled.value = true;
  });

  return computed(() => isExtensionInstalled.value);
}
