import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import user from './modules/user'
import hotel from './modules/hotel'

import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    user,
    hotel
  },
  state: {
    systemInfo: ''
  },
  mutations: {
    SET_SYSINFO: (state, systemInfo) => {
      state.systemInfo = systemInfo
    }
  },
  actions: {
    setSysInfo ({ commit }, sysInfo) {
      commit('SET_SYSINFO', sysInfo)
    }
  },
  getters
})
