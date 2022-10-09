export interface SupportedService {
  background: string;
  name: string;
  supported: boolean;
  textColor: string;
  url: string;
}

export interface RemoteConfig {
  services: SupportedService[];
}

export function getLatestRemoteConfig(): Promise<RemoteConfig> {
  return fetch('https://remote-config.anime-skip.com/api/config/anime-skip.com').then(res =>
    res.json(),
  );
}
