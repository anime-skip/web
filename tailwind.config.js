const { theme } = require('tailwindcss');

module.exports = {
  presets: [require('@anime-skip/ui/tailwind.preset')],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fill: {
        current: 'currentColor',
        'secondary-300': "theme('colors.secondaryPalette.300')",
      },
    },
  },
};
