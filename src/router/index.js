/*
 * @Author: xiawang1024
 * @Date: 2023-06-12 16:38:14
 * @LastEditTime: 2023-06-13 17:39:20
 * @LastEditors: xiawang1024
 * @Description:
 * @FilePath: /electronic-file/src/router/index.js
 * 工作，生活，健康
 */

import Vue from 'vue'
import VueRouter from 'vue-router'

import DataV from '@/views/home/index.vue'
import Order from '@/views/order/index.vue'
import Work from '@/views/work/index.vue'
import Service from '@/views/service/index.vue'
import Danger from '@/views/danger/index.vue'
import Report from '@/views/report/index.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'DataV',
    component: DataV,
  },
  {
    path: '/order',
    name: 'Order',
    component: Order,
  },
  {
    path: '/work',
    name: 'Work',
    component: Work,
  },
  {
    path: '/service',
    name: 'Service',
    component: Service,
  },
  {
    path: '/danger',
    name: 'Danger',
    component: Danger,
  },
  {
    path: '/report',
    name: 'Report',
    component: Report,
  },
]

const router = new VueRouter({
  routes,
})

// 路由守卫
// router.beforeEach((to, from, next) => {
//   // 检查localStorage中是否有token
//   const token = localStorage.getItem('token')
//   if (to.path === '/login') {
//     next()
//   } else {
//     token ? next() : next('/login')
//   }
// })

export default router
