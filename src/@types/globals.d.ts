type BrowserType =
  | 'chrome'
  | 'firefox'
  | 'safari'
  | 'opera'
  | 'ie'
  | 'edge'
  | 'edgechromium'
  | 'unsupported';

interface SupportedService {
  name: string;
  supported: true;
  link: string;
  foreground: string;
  background: string;
}

interface UnsupportedService {
  name: string;
  supported: false;
  foreground: string;
  background: string;
}

type Service = SupportedService | UnsupportedService;
