const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 解决跨域问题
  devServer:{
    proxy:{
      '/api':{
        target: 'http://localhost:8080',
        changeOrigin:true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }

  }
})
