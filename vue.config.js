// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true,
//   // devServer: {
//   //   port: 3000,
//   //   open: true,
//   //   hot: true, //自动保存
//   // },
// })

const path = require('path')
const resolve = (dir) => path.join(__dirname, dir)

module.exports = {
  publicPath: './',
  // devServer: {
  //   proxy: 'http://43.139.26.63:3000',
  // },

  chainWebpack: (config) => {
    config.resolve.alias.set('@', resolve('src'))
    config.when(process.env.NODE_ENV === 'production', (config) => {
      /* 设置打包入口 */
      config.entry('app').clear().add('./src/main-prod.js')

      config.set('externals', {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        axios: 'axios',
        vuex: 'Vuex',
        // 'better-scroll': 'BScroll',
      })

      config.plugin('html').tap((args) => {
        //添加参数isProd
        args[0].isProd = true
        return args
      })
    })
    config.when(process.env.NODE_ENV === 'development', (config) => {
      config.entry('app').clear().add('./src/main.js')
      config.plugin('html').tap((args) => {
        //添加参数isProd
        args[0].isProd = false
        return args
      })
    })
  },

  productionSourceMap: false,
}
