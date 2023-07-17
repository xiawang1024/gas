/*
 * @Author: xiawang1024
 * @Date: 2023-06-12 16:38:14
 * @LastEditTime: 2023-07-04 10:59:52
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
import NotFound from '@/views/404/index.vue'
import Login from '@/views/login/index.vue'
import Flow from '@/views/flow/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/datav',
  },
  {
    path: '/datav',
    name: 'DataV',
    component: DataV,
  },
  {
    path: '/order',
    name: 'Order',
    component: Order,
    meta: {
      title: '客户缴费查询系统',
    },
  },
  {
    path: '/work',
    name: 'Work',
    component: Work,
    meta: {
      title: '外勤查询系统',
    },
  },
  {
    path: '/service',
    name: 'Service',
    component: Service,
    meta: {
      title: '客户服务系统',
    },
  },
  {
    path: '/danger',
    name: 'Danger',
    component: Danger,
    meta: {
      title: '隐患排查治理系统',
    },
  },
  {
    path: '/report',
    name: 'Report',
    component: Report,
    meta: {
      title: '巡线管理系统',
    },
  },
  {
    path: '/flow',
    name: 'Flow',
    component: Flow,
    meta: {
      title: '传感器查询系统',
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound,
  },
]

const router = new VueRouter({
  routes,
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // 检查localStorage中是否有token
  const token = localStorage.getItem('token')
  if (to.path === '/login') {
    next()
  } else {
    token ? next() : next('/login')
  }
})

export default router
