const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

const isProEnv = process.env.NODE_ENV === 'production'
// vue.config.js
module.exports = {
  publicPath: isProEnv ? './' : '/',
  productionSourceMap: false,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@$', resolve('src'))
      .set('@assets', resolve('src/assets'))

    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .oneOf('inline')
      .resourceQuery(/inline/)
      .use('vue-svg-icon-loader')
      .loader('vue-svg-icon-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]'
      })
  },
  transpileDependencies: [
  ],
  css: {
    loaderOptions: {
      less: {
        globalVars: {
        },
        modifyVars: {
          // 'primary-color': '#F5222D',
          // 'link-color': '#F5222D',
          // 'border-radius-base': '4px'
        },
        javascriptEnabled: true
      }
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        resolve('./src/static/styles/variables.less')
      ]
    }
  },

  devServer: {
    proxy: {
     '/pro': {
        target: 'https://www.bookstack.cn/bookchat',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '/pro': '' // 默认所有请求都加了/pro前缀，需要去掉
        }
      }
    }
  },

  lintOnSave: true
}
