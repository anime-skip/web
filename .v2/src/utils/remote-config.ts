export interface RemoteConfig {
  services: Array<{
    background: string;
    name: string;
    supported: boolean;
    textColor: string;
    url: string;
  }>;
}

export function getLatestRemoteConfig(): Promise<RemoteConfig> {
  return fetch('http://remote-config.anime-skip.com/api/config/anime-skip.com').then(res =>
    res.json(),
  );
}
