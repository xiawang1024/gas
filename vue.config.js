/*
 * @Author: xiawang1024
 * @Date: 2023-06-12 08:45:39
 * @LastEditTime: 2023-08-30 11:45:12
 * @LastEditors: xiawang1024
 * @Description:
 * @FilePath: /electronic-file/vue.config.js
 * 工作，生活，健康
 */
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.241.94:8089',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
}
