/*
 * @Author: xiawang1024
 * @Date: 2023-06-12 08:45:39
 * @LastEditTime: 2023-06-12 16:50:05
 * @LastEditors: xiawang1024
 * @Description:
 * @FilePath: /electronic-file/src/main.js
 * 工作，生活，健康
 */
import Vue from 'vue'
import App from './App.vue'

import './assets/common.less'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import dataV from '@jiaminghi/data-view'

import router from './router/index.js'

Vue.config.productionTip = false

Vue.use(dataV)

Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
