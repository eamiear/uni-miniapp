var toString = Object.prototype.toString

function isArray (val) {
  return toString.call(val) === '[object Array]'
}

function forEach (obj, fn) {
  if (obj === null || typeof obj === 'undefined') {
    return
  }
  if (typeof obj !== 'object') {
    obj = [obj]
  }
  if (isArray(obj)) {
    for (var i = 0, l = obj.length; i < l; i++) {
      // eslint-disable-next-line no-useless-call
      fn.call(null, obj[i], i, obj)
    }
  } else {
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        // eslint-disable-next-line no-useless-call
        fn.call(null, obj[key], key, obj)
      }
    }
  }
}

function extend (a, b, thisArg) {
  forEach(b, (val, key) => {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg)
    } else {
      a[key] = val
    }
  })
  return a
}

function bind (fn, thisArg) {
  return function wrap () {
    var args = new Array(arguments.length)
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i]
    }
    return fn.apply(thisArg, args)
  }
}

function isAbsoluteURL (url) {
  // eslint-disable-next-line no-useless-escape
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url)
}
function combineURLs (baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL
}
function buildFullPath (baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL)
  }
  return requestedURL
}

export {
  forEach,
  extend,
  bind,
  isAbsoluteURL,
  combineURLs,
  buildFullPath
}
