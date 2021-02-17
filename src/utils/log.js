/*
 * @Author: eamiear
 * @Date: 2021-02-07 15:56:28
 * @Last Modified by: eamiear
 * @Last Modified time: 2021-02-15 20:48:41
 */
import Minilog from 'minilog'
import config from '@/config/defaultSettings'
const name = require('../../package.json').name || 'onbright-app'

const debug = config.debug
debug ? Minilog.enable() : Minilog.disable()

const logger = new Minilog('app')

export const log = (msg = '') => {
  logger.log(`[${name}]: `, msg)
}

export const warn = (msg = '') => {
  logger.warn(`[${name}]: `, msg)
}

export const info = (msg = '') => {
  logger.info(`[${name}]: `, msg)
}

export const error = (msg = '') => {
  logger.error(`[${name}]: `, msg)
}

console.log.call()

export default {
  log,
  warn,
  info,
  error
}
