/*
 * @Author: xiawang1024
 * @Date: 2023-08-31 09:26:29
 * @LastEditTime: 2023-08-31 10:31:03
 * @LastEditors: xiawang1024
 * @Description:
 * @FilePath: /electronic-file/src/store/index.js
 * 工作，生活，健康
 */
import Vue from 'vue'
import Vuex from 'vuex'

import { routes } from '@/router/index.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    routes: routes,
    permission_routes: [],
  },
  getters: {
    permission_routes(state) {
      return state.permission_routes
    },
  },
  mutations: {
    UPDATE_PERMISSIONS(state, payload) {
      state.permission_routes = state.routes.filter(
        item => item.roles && item.roles.includes(payload)
      )
    },
  },
  actions: {
    update_permissions({ commit }, payload) {
      commit('UPDATE_PERMISSIONS', payload)
    },
  },
})

export default store
