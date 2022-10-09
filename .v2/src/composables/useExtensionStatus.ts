import { SessionStorageKeys } from '~~/utils/query-keys';

export default function () {
  if (process.server)
    return {
      isExtensionInstalled: ref(false),
      installExtension: () => {},
      isExtensionLoggedIn: ref(false),
      logIntoExtension: () => {},
    };

  const isExtensionInstalled = useSessionStorage(SessionStorageKeys.EXTENSION_INSTALLED, false);
  const isExtensionLoggedIn = useSessionStorage(SessionStorageKeys.EXTENSION_LOGGED_IN, false);
  const installExtension = () => {
    isExtensionInstalled.value = true;
  };
  const logIntoExtension = () => {
    isExtensionLoggedIn.value = true;
  };
  const openAllSettings = () => {};
  function extensionMessageListener(event: MessageEvent) {
    if (event.data === '@anime-skip/login-check') {
      isExtensionLoggedIn.value = true;
    } else if (event.data === '@anime-skip/install-check') {
      isExtensionInstalled.value = true;
    }
  }
  window.addEventListener('message', extensionMessageListener);

  return {
    isExtensionInstalled,
    installExtension,
    isExtensionLoggedIn,
    logIntoExtension,
    openAllSettings,
  };
}
