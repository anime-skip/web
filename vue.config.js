/* eslint-disable */
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  outputDir: path.resolve(__dirname, 'dist', 'web'),
  configureWebpack: {
    plugins: [
      new CopyPlugin({
        patterns: [
          { from: 'static.json', to: '../static.json' },
          { from: 'package.json', to: '../package.json' },
        ],
      }),
    ],
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/scss/theme.scss";`,
      },
    },
  },
};
