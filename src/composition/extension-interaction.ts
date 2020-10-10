export default function useExtensionInteraction() {
  const openPopup = () => {
    const event = document.createEvent('Event');
    event.initEvent('@anime-skip/open-popup');
    document.dispatchEvent(event);
  };
  const openKeyboardShortcuts = () => {
    const event = document.createEvent('Event');
    event.initEvent('@anime-skip/open-options');
    document.dispatchEvent(event);
  };

  const sendMockInstallMessage = () => window.postMessage('@anime-skip/install-check', '*');
  const sendMockLoginMessage = () => window.postMessage('@anime-skip/login-check', '*');

  return {
    openPopup,
    openKeyboardShortcuts,
    sendMockInstallMessage,
    sendMockLoginMessage,
  };
}
