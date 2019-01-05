module.exports = {
  devServer: {
    open: process.platform === 'darwin',
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
