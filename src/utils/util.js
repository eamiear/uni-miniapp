/*
 * @Author: eamiear
 * @Date: 2021-02-07 15:06:53
 * @Last Modified by: eamiear
 * @Last Modified time: 2021-02-17 23:15:42
 */

const _toString = Object.prototype.toString

export function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

export function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

export function isArray (obj) {
  return _toString.call(obj) === '[object Array]'
}
export function isPromise (val) {
  return val && typeof val.then === 'function'
}

export function isEmail (str) {
  return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(str)
}

/**
 * 手机号码
 */
export function isMobile (s) {
  return /^1[0-9]{10}$/.test(s)
}

/**
 * 电话号码
 */
export function isPhone (s) {
  // return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s)
  return /^[1][3,4,5,7,8][0-9]{9}$/.test(s)
}

/**
 * URL地址
 */
export function isURL (s) {
  return /^http[s]?:\/\/.*/.test(s)
}

export function isAjaxSuccess (code) {
  return code && code.toLowerCase() === 'ok'
}
