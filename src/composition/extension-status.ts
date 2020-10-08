import { SessionStorageKeys } from '@/utils/enums';
import { ref } from 'vue';

export default function useExtensionStatus() {
  const isExtensionInstalled = ref<boolean>(
    sessionStorage.getItem(SessionStorageKeys.EXTENSION_INSTALLED) === 'true',
  );
  const isExtensionLoggedIn = ref<boolean>(
    sessionStorage.getItem(SessionStorageKeys.EXTENSION_LOGGED_IN) === 'true',
  );
  const logIntoExtension = () => {
    isExtensionLoggedIn.value = true;
  };
  function extensionMessageListener(event: MessageEvent) {
    if (event.data === '@anime-skip/login-check') {
      isExtensionLoggedIn.value = true;
      sessionStorage.setItem(SessionStorageKeys.EXTENSION_LOGGED_IN, 'true');
    } else if (event.data === '@anime-skip/install-check') {
      isExtensionInstalled.value = true;
      sessionStorage.setItem(SessionStorageKeys.EXTENSION_INSTALLED, 'true');
    }
  }
  window.addEventListener('message', extensionMessageListener);

  return {
    isExtensionInstalled,
    isExtensionLoggedIn,
    logIntoExtension,
  };
}
