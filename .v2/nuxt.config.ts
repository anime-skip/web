import DaisyUI from 'daisyui';

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
  ],
  // https://tailwindcss.nuxtjs.org/getting-started/options
  tailwindcss: {
    viewer: false,
    config: {
      theme: {
        extend: {},
      },
      plugins: [DaisyUI],
      daisyui: {
        themes: [
          {
            'anime-skip': {
              primary: '#4ec4f6',
              secondary: '#8d5dd6',
              accent: '#b6dd7d',
              neutral: '#000000',
              'base-100': '#142026',
              info: '#b6dd7d',
              success: '#b6dd7d',
              warning: '#fcd34d',
              error: '#f78250',
            },
          },
        ],
        logs: false,
      },
    },
  },
});
