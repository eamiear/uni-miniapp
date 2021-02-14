import Mock from 'better-mock'
import { builder } from '../util'

const getLastVersion = () => {
  return builder({
    records: {
      version: Mock.mock('@integer(1, 2)'),
      updatedAt: Mock.mock('@datetime')
    }
  })
}

Mock.mock(/\/api\/v1\/version/, 'get', getLastVersion)
