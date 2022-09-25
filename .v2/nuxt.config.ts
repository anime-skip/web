import tailwindConfig from './tailwind.config';

export default defineNuxtConfig({
  rootDir: 'src',
  typescript: {
    shim: false,
  },
  modules: [
    '@nuxtjs/tailwindcss',
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', ['defineStore', 'definePiniaStore']],
      },
    ],
    '@vueuse/nuxt',
  ],
  runtimeConfig: {
    public: {
      API_URL: 'https://api.anime-skip.com/graphql',
      API_CLIENT_ID: 'th2oogUKrgOf1J8wMSIUPV0IpBMsLOJi',
    },
  },
  // https://tailwindcss.nuxtjs.org/getting-started/options
  tailwindcss: {
    viewer: false,
    config: tailwindConfig,
  },
});
