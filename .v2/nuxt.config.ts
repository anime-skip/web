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
    [
      '@unocss/nuxt',
      {
        uno: false, // enabled "@unocss/preset-uno"
        icons: true, // enabled "@unocss/preset-icons"
        attributify: false, // enabled "@unocss/preset-attributify"
        // core options
        shortcuts: [],
        rules: [],
      },
    ],
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
