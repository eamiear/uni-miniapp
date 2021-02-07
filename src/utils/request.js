/* eslint-disable no-undef */
/*
 * @Author: eamiear
 * @Date: 2021-02-07 14:44:03
 * @Last Modified by: eamiear
 * @Last Modified time: 2021-02-07 17:12:41
 */

import { ACCESS_TOKEN } from '@/store/mutation-types'
import storage from './storage'

const requestInterceptors = (config) => {
  const token = storage.get(ACCESS_TOKEN)
  if (token) {
    config.header['X-Access-Token'] = token
  }
}
const responseInterceptors = (response) => {
  if (response.data && response.data.code === 'SYS009') {
    // store.dispatch('Logout').then(() => {
    //   window.location.reload()
    // })
  }
  return response.data
}

/**
 * @param {string} url api路径
 * @param {object} params 请求参数
 * @param {string} method 请求方法
 * @param {object} extra 额外参数
 * extra = {
 *  header: {},
 * timeout: 6000
 * ...
 * }
 */
const request = (url, params = {}, method = 'GET', extra = {}) => {
  return new Promise((resolve, reject) => {
    extra.header = extra.header || {}
    requestInterceptors(extra)
    uni.request({
      url,
      method,
      data: params,
      ...extra,
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(responseInterceptors(res))
        } else {
          reject(res)
        }
      },
      fail: reject
    })
  })
}

export const getAction = (url, params = {}, extra = {}) => {
  return request(url, params, extra)
}

export const postAction = (url, params = {}, extra = {}) => {
  return request(url, params, 'POST', extra)
}
export const putAction = (url, params = {}, extra = {}) => {
  return request(url, params, 'PUT', extra)
}
export const deleteAction = (url, params = {}, extra = {}) => {
  return request(url, params, 'DELETE', extra)
}

export const http = {
  get: getAction,
  post: postAction,
  put: putAction,
  delete: deleteAction,
  request
}

export default http
