/// <reference types="nuxt" />

import tailwindConfig from './tailwind.config';

export default defineNuxtConfig({
  rootDir: 'src',
  typescript: {
    shim: false,
  },
  app: {
    head: {
      link: [
        { rel: 'icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/static/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/static/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/static/favicon-16x16.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
      script: [
        {
          async: '',
          defer: '',
          'data-website-id': '521bc067-e68b-4e33-90db-5f3f40344bd0',
          src: 'https://stats.aklinker1.io/umami.js',
        },
      ],
    },
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
    '@nuxt/content',
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
  content: {
    highlight: {
      theme: 'github-dark',
      preload: ['shell', 'graphql', 'json'],
    },
  },
});
