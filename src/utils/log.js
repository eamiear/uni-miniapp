/*
 * @Author: eamiear
 * @Date: 2021-02-07 15:56:28
 * @Last Modified by:   eamiear
 * @Last Modified time: 2021-02-07 15:56:28
 */
import minilog from 'minilog'
import config from '@/config/defaultSettings'
const name = require('../../package.json').name || 'onbright-app'

const debug = config.debug
debug ? minilog.enable() : minilog.disable()

export const log = (msg = '') => {
  minilog.log(`[${name}]: ${msg}`)
}

export const warn = (msg = '') => {
  minilog.warn(`[${name}]: ${msg}`)
}

export const info = (msg = '') => {
  minilog.info(`[${name}]: ${msg}`)
}

export const error = (msg = '') => {
  minilog.error(`[${name}]: ${msg}`)
}
