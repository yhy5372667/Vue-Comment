const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  devServer:{
    proxy:{
      '/api':{
        target:'http://1.116.64.64:5004/api2/', //代理
        changeOrigin:true, //允许跨域
        pathRewrite:{
          '^/api':''
        }
      }
    }
  }
})
