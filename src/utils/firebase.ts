import { initializeApp } from 'firebase/app';
import { getRemoteConfig, fetchAndActivate } from 'firebase/remote-config';

const config = {
  apiKey: 'AIzaSyBBShu-6ZeiWna_0yvmuQXw2PAJoRiPJeM',
  authDomain: 'anime-skip-website.firebaseapp.com',
  projectId: 'anime-skip-website',
  storageBucket: 'anime-skip-website.appspot.com',
  messagingSenderId: '946464994437',
  appId: '1:946464994437:web:e677eb2182c0a5e7dc25ec',
};

const app = initializeApp(config);

// Remote config

export const remoteConfig = getRemoteConfig(app);
if (import.meta.env.DEV) remoteConfig.settings.minimumFetchIntervalMillis = 30e3;
fetchAndActivate(remoteConfig);

export interface Service {
  name: string;
  textColor: string;
  background: string;
  supported: boolean;
}

const defaultServices: Service[] = [
  {
    name: 'Cruncyroll',
    textColor: '#FFFFFF',
    background: '#F37521',
    supported: true,
  },
  {
    name: 'Funimation',
    textColor: '#FFFFFF',
    background: '#631DB2',
    supported: true,
  },
  {
    name: 'VRV',
    textColor: '#000000',
    background: '#FFDD00',
    supported: true,
  },
  {
    name: 'Zoro.to',
    textColor: '#CAE962',
    background: '#111111',
    supported: true,
  },
];

remoteConfig.defaultConfig = {
  services: JSON.stringify(defaultServices),
};
