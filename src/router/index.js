/*
 * @Author: xiawang1024
 * @Date: 2023-06-12 16:38:14
 * @LastEditTime: 2023-06-12 17:01:53
 * @LastEditors: xiawang1024
 * @Description:
 * @FilePath: /electronic-file/src/router/index.js
 * 工作，生活，健康
 */

import Vue from 'vue'
import VueRouter from 'vue-router'

import DataV from '@/views/home/index.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'datav',
    component: DataV
  }
]

const router = new VueRouter({
  routes
})

export default router
