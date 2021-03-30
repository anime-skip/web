export function as<T>(t: T): T {
  return t;
}

interface LocalStorageTypes {
  rememberMeChecked: boolean;
  username: string;
}
export function getPersistedValue<T extends keyof LocalStorageTypes>(
  key: T,
): LocalStorageTypes[T] | undefined {
  const storedObject = localStorage.getItem(key);
  if (storedObject == null) return undefined;
  return JSON.parse(storedObject)[key];
}

export function persistValue<T extends keyof LocalStorageTypes>(
  key: T,
  value: LocalStorageTypes[T],
): LocalStorageTypes[T] | undefined {
  localStorage.setItem(key, JSON.stringify({ [key]: value }));
  const storedObject = localStorage.getItem(key);
  if (storedObject == null) return undefined;
  return JSON.parse(storedObject)[key];
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
export function detectBrowser(): BrowserType {
  // Opera 8.0+
  // @ts-ignore
  if ((!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0)
    return 'opera';

  // Firefox 1.0+
  // @ts-ignore
  if (typeof InstallTrigger !== 'undefined') return 'firefox';

  // Safari 3.0+ "[object HTMLElementConstructor]"
  if (
    // @ts-ignore
    /constructor/i.test(window.HTMLElement) ||
    (function (p) {
      return p.toString() === '[object SafariRemoteNotification]';
      // @ts-ignore
    })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification))
  )
    return 'safari';

  // Internet Explorer 6-11
  // @ts-ignore
  const isIe = /*@cc_on!@*/ false || !!document.documentMode;
  // Edge 20+
  if (!isIe && !!window.StyleMedia) return 'edge';
  if (isIe) return 'ie';

  // Chrome 1 - 79
  // @ts-ignore
  const isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
  // Edge (based on chromium) detection
  if (isChrome && navigator.userAgent.indexOf('Edg') != -1) return 'edgechromium';
  if (isChrome) return 'chrome';

  return 'unsupported';
}
/* eslint-enable @typescript-eslint/ban-ts-comment */
