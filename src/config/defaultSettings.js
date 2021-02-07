/*
 * @Author: eamiear
 * @Date: 2021-02-07 14:08:04
 * @Last Modified by: eamiear
 * @Last Modified time: 2021-02-07 15:55:27
 */
import { isProEnv } from './envConfig'

export default {
  shareContent: '分享内容信息',
  shareLink: '', // 分享url, https://aliiot.on-bright.com/miniapp/share/4
  debug: !isProEnv, // 是否是调试模式。如果是生产环境，设置为false
  info: { // 程序信息
    about: 'help/about',
    version: '',
    copyright: '',
    license: '',
    author: ''
  },
  title: '昂宝小程序',
  logo: 'logo.svg'
}
