/* eslint-disable no-undef */
/*
 * @Author: eamiear
 * @Date: 2021-02-07 15:10:06
 * @Last Modified by: eamiear
 * @Last Modified time: 2021-02-15 08:58:59
 */

import { warn } from './log'
import { isObject } from './util'
import { ACCESS_TOKEN } from '@/store/mutation-types'

export default {
  set (key, value = '') {
    if (!key) return warn('key 不能为空')
    if (isObject(value)) value = JSON.stringify(value)
    uni.setStorageSync(key, value)
  },
  get (key) {
    if (!key) return warn('key 不能为空')
    let value = uni.getStorageSync(key)
    try {
      value = JSON.parse(value)
    } catch (e) {
    }
    return value
  },
  remove (key) {
    if (!key) return warn('key 不能为空')
    uni.removeStorageSync(key)
  },
  clear () {
    uni.clearStorage()
  },
  getToken () {
    return this.get(ACCESS_TOKEN)
  }
}
