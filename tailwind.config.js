module.exports = {
  presets: [require('@anime-skip/ui/tailwind.preset')],
  purge: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/@anime-skip/ui/ui.*.js',
    './node_modules/@anime-skip/ui/tailwind.css',
  ],
  theme: {
    extend: {
      fill: {
        current: 'currentColor',
        'secondary-300': "theme('colors.secondaryPalette.300')",
      },
      border: {
        transparent: 'transparent',
      },
    },
  },
};
