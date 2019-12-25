const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  runtimeCompiler: true,
  productionSourceMap: false,
  devServer: {
    port: 12306,
    proxy: {
      '/api': {
        target: 'https://hellomrbigbigshot.xyz',
        changeOrigin: true
      }
    }
  },
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
      })
    config.resolve.alias
      .set('@$', resolve('src'))
  }
}
