export default function useExtensionInteraction() {
  const openLogin = () => {
    const event = document.createEvent('Event');
    event.initEvent('@anime-skip/open-login');
    document.dispatchEvent(event);
  };
  const openPlayerSettings = () => {
    const event = document.createEvent('Event');
    event.initEvent('@anime-skip/open-all-settings');
    document.dispatchEvent(event);
  };

  const sendMockInstallMessage = () => window.postMessage('@anime-skip/install-check', '*');
  const sendMockLoginMessage = () => window.postMessage('@anime-skip/login-check', '*');

  return {
    openLogin,
    openPlayerSettings,
    sendMockInstallMessage,
    sendMockLoginMessage,
  };
}
