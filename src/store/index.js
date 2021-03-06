import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'

import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user
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
