/* eslint-disable */
const path = require('path');

module.exports = {
  outputDir: path.resolve(__dirname, 'dist'),
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/scss/theme.scss";`,
      },
    },
  },
};
