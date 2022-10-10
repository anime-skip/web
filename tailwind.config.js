const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        stylized: ['Overpass', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require('daisyui'), require('@tailwindcss/typography')],
  daisyui: {
    themes: [
      {
        'anime-skip': {
          primary: '#4ec4f6',
          secondary: '#a27bde',
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
};
