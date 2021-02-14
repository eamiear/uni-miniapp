/* eslint-disable no-undef */
import { buildFullPath, bind, extend, forEach } from './util'
const DEFAULT_CONTENT_TYPE = {
  Accept: 'application/json, text/plain, */*',
  'Content-Type': 'application/json;charset=utf-8'
}

const defaults = {
  timeout: 6000,
  headers: {
    ...DEFAULT_CONTENT_TYPE
  }
}

const dispatchRequest = (config) => {
  config.headers = config.headers || DEFAULT_CONTENT_TYPE

  return new Promise((resolve, reject) => {
    config.complete = response => {
      const statusCode = response.statusCode
      response.config = config
      if (statusCode === 200) {
        resolve(response)
      } else {
        reject(response)
      }
    }
    uni.request(config)
  })
}

function Http (instanceConfig) {
  this.defaults = instanceConfig
  this.interceptors = {
    request: [],
    response: []
  }
}
Http.prototype.request = (config) => {
  if (typeof config === 'string') {
    config = arguments[1] || {}
    config.url = arguments[0]
  } else {
    config = config || {}
  }
  config = Object.assign({}, this.defaults, config)

  if (config.method) {
    config.method = config.method.toLowerCase()
  } else if (this.defaults.method) {
    config.method = this.defaults.toLowerCase()
  } else {
    config.method = 'get'
  }
  config.url = buildFullPath(config.baseUrl, config.url)

  const chain = [dispatchRequest, undefined]
  let promise = Promise.resolve(config)
  this.interceptors.request.forEach(interceptor => {
    chain.unshift(interceptor)
  })
  this.interceptors.response.forEach(interceptor => {
    chain.push(interceptor)
  })
  while (chain.length) {
    promise = promise.then(chain.shift())
  }
  return promise
}

forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData (method) {
  Http.prototype[method] = function (url, config) {
    return this.request(Object.assign(config || {}, {
      method: method,
      url: url
    }))
  }
})

forEach(['post', 'put', 'patch'], function forEachMethodWithData (method) {
  Http.prototype[method] = function (url, data, config) {
    return this.request(Object.assign(config || {}, {
      method: method,
      url: url,
      data: data
    }))
  }
})

// 实例化
function createInstance (defaultConfig) {
  const context = new Http(defaultConfig)
  const instance = bind(Http.prototype.request, context)
  extend(instance, Http.prototype, context)
  extend(instance, context)
  return instance
}

const http = createInstance(defaults)

http.Http = Http

http.create = instanceConfig => {
  return createInstance(Object.assign(http.defaults, instanceConfig))
}
http.all = promises => {
  return Promise.all(promises)
}

export default http
