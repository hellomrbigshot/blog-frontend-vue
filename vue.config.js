module.exports = {
  runtimeCompiler: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'https://hellomrbigbigshot.xyz',
        changeOrigin: true
      }
    }
  }
}
