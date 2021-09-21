export const UNAUTHORIZED_ERROR_MESSAGE = 'unauthorized - log out';
export const LOG_IN_REDIRECT = '/account';

export const CHROME_STORE_URL =
  'https://chrome.google.com/webstore/detail/anime-skip/mgmdkjcljneegjfajchedjpdhbadklcf';
export const FIREFOX_STORE_URL = 'https://addons.mozilla.org/en-US/firefox/addon/anime-skip/';

export const ALL_SERVICES: Service[] = [
  {
    name: 'VRV',
    supported: true,
    link: 'https://vrv.co/',
    foreground: '#000000',
    background: '#ffdd00',
  },
  {
    name: 'Funimation',
    supported: true,
    link: 'https://www.funimation.com/',
    foreground: '#f9f9f9',
    background: '#4d02a3',
  },
  {
    name: 'Crunchyroll',
    supported: true,
    link: 'https://www.crunchyroll.com/',
    foreground: '#ffffff',
    background: '#f37521',
  },
  {
    name: 'Hulu',
    supported: false,
    foreground: '#000000',
    background: '#1ce783',
  },
  {
    name: 'NETFLIX',
    supported: false,
    foreground: '#000000',
    background: '#e30d1a',
  },
  {
    name: 'Prime Video',
    supported: false,
    foreground: '#ffffff',
    background: '#3daae0',
  },
];

export const SUPPORTED_SERVICES = ALL_SERVICES.filter(
  ({ supported }) => supported,
) as SupportedService[];
