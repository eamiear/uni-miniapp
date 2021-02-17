/*
 * @Author: eamiear
 * @Date: 2021-02-15 08:06:10
 * @Last Modified by: eamiear
 * @Last Modified time: 2021-02-15 21:20:55
 */
import { postAction } from '@/utils/request'

const login = (username, password) => postAction('/auth/login', { username, password })
const loginByWechat = (code, userInfo) => postAction('/auth/wechat', { code, userInfo })
const logout = (token) => postAction('/auth/logout', {}, { headers: { 'X-Access-Token': token } })

export {
  login,
  loginByWechat,
  logout
}
