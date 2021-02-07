/*
 * @Author: eamiear
 * @Date: 2021-02-07 15:06:53
 * @Last Modified by: eamiear
 * @Last Modified time: 2021-02-07 16:28:48
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
export function isAjaxSuccess (code) {
  return code && code.toLowerCase() === 'ok'
}
