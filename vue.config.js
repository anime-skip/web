module.exports = {
  devServer: {
    open: true,
    host: '0.0.0.0',
    port: 8001, // CHANGE YOUR PORT HERE!
    https: false,
    hotOnly: false,
  },
  css: {
    loaderOptions: {
      sass: {
        data: '@import "src/assets/styles.scss";',
      },
    },
  }
}
