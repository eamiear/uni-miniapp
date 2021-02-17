/*
 * @Author: eamiear
 * @Date: 2021-02-15 08:05:47
 * @Last Modified by:   eamiear
 * @Last Modified time: 2021-02-15 08:05:47
 */
import { getAction } from '@/utils/request'

const getLastVersion = () => getAction('/api/v1/version')

export {
  getLastVersion
}
