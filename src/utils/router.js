/* eslint-disable no-undef */
/*
 * @Author: eamiear
 * @Date: 2021-02-13 14:36:57
 * @Last Modified by: eamiear
 * @Last Modified time: 2021-02-15 21:17:06
 */

 const Constants = {
  HOME: '/pages/index/index',
  LOGIN: '/pages/login/login',
  REG: '/pages/reg/reg',
  BIND: '/pages/bind/bind'
 }

 /**
  * 构建访问路径
  * @param {string} page page 路径
  * @param {object} data 参数
  */
function buildUrl (page, data) {
  if (!page) throw new Error(`${page} is not exist!`)
  const _result = []
  for (const key in data) {
    const value = data[key]
    if (!value) continue
    if (value.constructor === Array) {
      value.forEach(_value => {
        _result.push(encodeURIComponent(key) + '[]=' + encodeURIComponent(_value))
      })
    } else {
      _result.push(encodeURIComponent(key) + '=' + encodeURIComponent(value))
    }
  }
  const url = page + (_result.length ? `?${_result.join('&')}` : '')
  return url
}

class Router {
  push (page, param = {}, events = {}, callback) {
    return new Promise((resolve, reject) => {
      uni.navigateTo({
        url: buildUrl(page, param),
        events,
        success: res => {
          callback && callback(res)
          resolve(res)
        },
        fail: reject
      })
    })
  }
  pop (delta = 1) {
    uni.navigateBack({ delta })
  }
  back (delta = 1) {
    this.pop(delta)
  }
  redirectTo (page, param) {
    return new Promise((resolve, reject) => {
      uni.redirectTo({
        url: buildUrl(page, param),
        success: resolve,
        fail: reject
      })
    })
  }
  switchTab (page, param) {
    return new Promise((resolve, reject) => {
      uni.switchTab({
        url: buildUrl(page, param),
        success: resolve,
        fail: reject
      })
    })
  }
  // 关闭所有页面，打开到应用内的某个页面。
  reLaunch (page, param) {
    return new Promise((resolve, reject) => {
      uni.reLaunch({
        url: buildUrl(page, param),
        success: resolve,
        fail: reject
      })
    })
  }
  toHome () {
    getCurrentPages().length > 1 ? this.pop() : this.reLaunch(Constants.HOME)
  }
  toLogin (params = {}) {
    return this.redirectTo(Constants.LOGIN, params)
  }
  toReg (params = {}) {
    return this.redirectTo(Constants.REG, params)
  }
  toBind (params = {}) {
    return this.redirectTo(Constants.BIND, params)
  }
}

export default new Router()
