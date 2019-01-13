import { NodeEnv } from './types';

const env: NodeEnv = process.env.NODE_ENV as NodeEnv || 'production';

interface ENV {
  API_URL: string;
}

const envs: { readonly [environment in NodeEnv]: ENV } = {
  development: {
    API_URL: 'http://localhost:8000/api',
  },
  production: {
    API_URL: 'https://anime-skip.com/api',
  },
};

export default envs[env];
