export default function useEnv() {
  return {
    isDev: process.env.NODE_ENV !== 'production',
  };
}
