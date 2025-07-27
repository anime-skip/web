import { useLocalStorage } from "@vueuse/core";
import { computed } from "vue";

export default function () {
  const isSignedIn = useLocalStorage("@anime-skip/extensionSignedIn", false);

  document.addEventListener("@anime-skip/login-check", () => {
    isSignedIn.value = true;
  });

  return computed(() => isSignedIn.value);
}
