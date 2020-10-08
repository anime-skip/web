export default function useExtensionInteraction() {
  const openPopup = () => window.postMessage('@anime-skip/open-popup', '*');
  const openKeyboardShortcuts = () =>
    window.postMessage('@anime-skip/open-keyboard-shortcuts', '*');

  const sendInstallMessage = () => window.postMessage('@anime-skip/install-check', '*');
  const sendLoginMessage = () => window.postMessage('@anime-skip/login-check', '*');

  return {
    openPopup,
    openKeyboardShortcuts,
    sendInstallMessage,
    sendLoginMessage,
  };
}
