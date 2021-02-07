/*
 * @Author: eamiear
 * @Date: 2021-02-07 14:06:04
 * @Last Modified by: eamiear
 * @Last Modified time: 2021-02-07 16:38:00
 */

// 开发环境
const DEV_API = './pro'
// 生产环境API路径
const PRO_API = '/control'
export const WEBSOCKET_URL = '/control/websocket/{topic}'

export const isProEnv = process.env.NODE_ENV === 'production'

// 接口请求基路径
export function getReqBaseUrl () {
  return isProEnv ? PRO_API : DEV_API
}

export const apiHost = getReqBaseUrl()
