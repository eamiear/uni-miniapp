import { getAction } from '@/utils/request'

const getLastVersion = () => getAction('/api/v1/version')

export {
  getLastVersion
}
