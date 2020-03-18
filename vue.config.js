const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  runtimeCompiler: true,
  productionSourceMap: false,
  pages: {
    index: {
      entry: 'src/index/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: '世说新语',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    admin: {
      entry: 'src/admin/main.js',
      template: 'public/admin.html',
      filename: 'admin.html',
      title: '管理',
      chunks: ['chunk-vendors', 'chunk-common', 'admin']
    }
  },
  devServer: {
    port: 10086,
    historyApiFallback: {
      rewrites: [
        { from: /^\/$/, to: '/index.html' },
        { from: /^\/admin\//, to: '/admin.html' }
      ],
      disableDotRule: true
    },
    proxy: {
      '/api': {
        target: 'http://localhost:8081',
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
      .set('index', resolve('src/index'))
      .set('admin', resolve('src/admin'))
  }
}
