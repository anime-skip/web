import { NodeEnv } from './types';

const env: NodeEnv = process.env.NODE_ENV as NodeEnv || 'production';

interface ENV {
  API_URL: string;
}

const envs: { development: ENV; production: ENV } = {
  development: {
    API_URL: 'http://localhost:8000/api',
  },
  production: {
    API_URL: 'https://anime-skip.com/api',
  },
};

export default envs[env];
