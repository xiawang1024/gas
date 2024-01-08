/*
 * @Author: xiawang1024
 * @Date: 2023-06-12 16:38:14
 * @LastEditTime: 2024-01-08 17:37:49
 * @LastEditors: xiawang1024
 * @Description:
 * @FilePath: /electronic-file/src/router/index.js
 * 工作，生活，健康
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import localforage from 'localforage'

import NotFound from '@/views/404/index.vue'
import Login from '@/views/login/index.vue'

import ZhongAn from '@/views/zhongAn/index.vue'
import ZhongAnWatch from '@/views/zhongAnWatch/index.vue'

Vue.use(VueRouter)

export const routes = [
  {
    path: '/',
    name: 'ZhongAn',
    component: ZhongAn,
    roles: ['admin'],
    meta: {
      title: '中安查询系统',
    },
  },
  {
    path: '/watch',
    name: 'ZhongAnWatch',
    component: ZhongAnWatch,
    roles: ['admin'],
    meta: {
      title: '中安监控系统',
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
router.beforeEach(async (to, from, next) => {
  try {
    // 检查localStorage中是否有token
    const token = await localforage.getItem('token')
    if (to.path === '/login') {
      next()
    } else {
      token ? next() : next('/login')
    }
  } catch (error) {
    console.log(err)
  }
})

export default router
