import { login, loginByWechat, logout } from '@/api/login'
import { ACCESS_TOKEN, USER_NAME, USER_INFO } from '@/store/mutation-types'
import storage from '@/utils/storage'
import { isAjaxSuccess } from '@/utils/util'

const user = {
  state: {
    token: '',
    username: '',
    avatar: '',
    roles: [],
    info: {},
    permissionList: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name }) => {
      state.username = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    },
    SET_PERMISSIONLIST: (state, permissionList) => {
      state.permissionList = permissionList
    }
  },

  actions: {
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo.username, userInfo.password).then(response => {
          if (isAjaxSuccess(response.code)) {
            const result = response.result
            const userInfo = result.userInfo
            storage.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000)
            storage.set(USER_NAME, userInfo.username, 7 * 24 * 60 * 60 * 1000)
            storage.set(USER_INFO, userInfo, 7 * 24 * 60 * 60 * 1000)
            commit('SET_TOKEN', result.token)
            commit('SET_INFO', userInfo)
            commit('SET_NAME', { username: userInfo.username, realname: userInfo.realname })
            commit('SET_AVATAR', userInfo.avatar)
            resolve(response)
          } else {
            resolve(response)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    LoginByWechat ({ commit }, { code, userInfo }) {
      return new Promise((resolve, reject) => {
        loginByWechat(code, userInfo).then(res => {
          if (isAjaxSuccess(res.code)) {
            const user = res.data.user
            if (!user || user.uid <= 0 || !user.token) {
              reject()
            }
            commit('SET_TOKEN', user.token)
            commit('SET_INFO', user)
            commit('SET_NAME', { username: user.username, realname: user.realname })
            commit('SET_AVATAR', user.avatar)
            resolve(user)
          } else reject()
        }).catch(error => reject(error))
      })
    },

    // 登出
    Logout ({ commit, state }) {
      return new Promise((resolve) => {
        const token = state.token
        commit('SET_TOKEN', '')
        commit('SET_PERMISSIONLIST', [])
        // storage.remove(ACCESS_TOKEN)
        storage.clear()
        logout(token).then(resolve).catch(resolve)
      })
    }

  }
}

export default user
