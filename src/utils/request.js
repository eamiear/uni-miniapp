/* eslint-disable no-undef */
/*
 * @Author: eamiear
 * @Date: 2021-02-07 14:44:03
 * @Last Modified by: eamiear
 * @Last Modified time: 2021-02-13 09:46:41
 */

import { ACCESS_TOKEN } from '@/store/mutation-types'
import storage from './storage'
import http from './http/http'
import { getReqBaseUrl } from '@/config/envConfig'

const service = http.create({
  baseURL: getReqBaseUrl(), // api base_url
  timeout: 6000 // 请求超时时间
})
service.interceptors.request.push(config => {
  const token = storage.get(ACCESS_TOKEN)
  if (token) {
    config.headers['X-Access-Token'] = token
  }
  return config
})
service.interceptors.response.push((response) => {
  if (response.data && response.data.code === 'SYS009') {
    uni.showToast({
      title: '权限验证失败',
      icon: 'none'
    })
  }
  return response.data
})

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
  return service({ url, method, data: params, ...extra })
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

export const _request = {
  get: getAction,
  post: postAction,
  put: putAction,
  delete: deleteAction,
  request
}

export default _request
