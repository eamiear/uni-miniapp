export function timeFix () {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
}

/**
 * 过滤对象中为空的属性
 * @param obj
 * @returns {*}
 */
export function filterObj (obj) {
  if (!(typeof obj === 'object')) {
    return
  }

  for (const key in obj) {
    if (obj.hasOwnProperty(key) && typeof obj[key] !== 'boolean' && !obj[key]) {
      delete obj[key]
    }
  }
  return obj
}

export function formatDate (time, format = '{y}-{m}-{d} {h}:{i}:{s}') {
  if (arguments.length === 0) {
    return null
  }
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const o = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const fmt = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = o[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return fmt
}
/**
 * 多久之前
 * @param  {String|Number} startTime 时间戳
 * @return {String}        hh:mm:ss
 */
export function calcDiffTime (startTime) {
  const endTime = Math.round(new Date().getTime() / 1000).toString()
  let st = 0
  let et = 0
  if (startTime < endTime) {
    st = startTime
    et = endTime
  } else {
    st = endTime
    et = startTime
  }
  let timeDiff = et - st
  let hour = Math.floor(timeDiff / 3600)
  hour < 10 && (hour = '0' + hour)
  timeDiff = timeDiff % 3600
  let minute = Math.floor(timeDiff / 60)
  minute < 10 && (minute = '0' + minute)
  timeDiff = timeDiff % 60
  let second = timeDiff
  second < 10 && (second = '0' + second)
  return hour + ':' + minute + ':' + second
}
/**
 * 多少分钟,计算两时间戳之间相隔时间
 * @param  {String|Number} startTime 时间戳
 * @return {String}        minute
 */
export function calcDiffMinute (startTime) {
  const endTime = Math.round(new Date().getTime() / 1000).toString()
  let st = 0
  let et = 0
  if (startTime < endTime) {
    st = startTime
    et = endTime
  } else {
    st = endTime
    et = startTime
  }
  const timeDiff = et - st
  const minute = Math.floor(timeDiff / 60)
  return minute
}
export function relativeTime (t) {
	const timestamp = parseInt(new Date(t).getTime() / 1000)
	const now = parseInt(new Date().getTime() / 1000)
	const diff = now - timestamp
	const minute = 60
	const hour = minute * 60
	const day = hour * 24
	const month = day * 30

	const monthC = diff / month
	const dayC = diff / day
	const hourC = diff / hour
	const minC = diff / minute

	if (monthC > 12) {
		return parseInt(monthC / 12) + ' 年前'
	} else if (monthC >= 1) {
		return parseInt(monthC) + ' 月前'
	} else if (dayC >= 1) {
		return parseInt(dayC) + ' 天前'
	} else if (hourC >= 1) {
		return parseInt(hourC) + ' 小时前'
	} else if (minC >= 1) {
		return parseInt(minC) + ' 分钟前'
	}
	return '刚刚'
}
/**
 * 生成随机长度字符
 * @param  {Number} len 长度
 * @return {String}
 */
export function random (len) {
  let ids = Date.now().toString(36)
  ids += Math.random()
    .toString(36)
    .substr(3, len)
  return ids
}

/**
 * 转 UTF8
 * @param  {String} s
 * @return {String} s
 */
export function encodeUTF8 (s) {
  var i
  var r = []
  var c
  var x
  for (i = 0; i < s.length; i++) {
    if ((c = s.charCodeAt(i)) < 0x80) r.push(c)
    else if (c < 0x800) {
      r.push(0xc0 + ((c >> 6) & 0x1f), 0x80 + (c & 0x3f))
    } else {
      if ((x = c ^ 0xd800) >> 10 === 0) {
        // eslint-disable-next-line no-unused-expressions
        c = (x << 10) + (s.charCodeAt(++i) ^ 0xdc00) + 0x10000
        r.push(0xf0 + ((c >> 18) & 0x7), 0x80 + ((c >> 12) & 0x3f))
      } else r.push(0xe0 + ((c >> 12) & 0xf))
      r.push(0x80 + ((c >> 6) & 0x3f), 0x80 + (c & 0x3f))
    }
  }
  return r
}
/**
 * 字符串加密成 hex 字符串
 * @param  {String} s
 * @return {String} s
 */
export function sha1 (str) {
  var data = new Uint8Array(encodeUTF8(str))
  var i, j, t
  var l = (((data.length + 8) >>> 6) << 4) + 16
  var s = new Uint8Array(l << 2)
  s.set(new Uint8Array(data.buffer))
  s = new Uint32Array(s.buffer)
  for (t = new DataView(s.buffer), i = 0; i < l; i++) {
    s[i] = t.getUint32(i << 2)
  }
  s[data.length >> 2] |= 0x80 << (24 - (data.length & 3) * 8)
  s[l - 1] = data.length << 3
  var w = []
  var f = [
    function () {
      return (m[1] & m[2]) | (~m[1] & m[3])
    },
    function () {
      return m[1] ^ m[2] ^ m[3]
    },
    function () {
      return (m[1] & m[2]) | (m[1] & m[3]) | (m[2] & m[3])
    },
    function () {
      return m[1] ^ m[2] ^ m[3]
    }
  ]
  var rol = function (n, c) {
    return (n << c) | (n >>> (32 - c))
  }
  var k = [1518500249, 1859775393, -1894007588, -899497514]
  var m = [1732584193, -271733879, null, null, -1009589776]
  m[2] = ~m[0]
  m[3] = ~m[1]
  for (i = 0; i < s.length; i += 16) {
    var o = m.slice(0)
    for (j = 0; j < 80; j++) {
      // eslint-disable-next-line no-unused-expressions
      (w[j] =
        j < 16
        ? s[i + j]
        : rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1)),
      (t =
        (rol(m[0], 5) +
          f[(j / 20) | 0]() +
          m[4] +
          w[j] +
          k[(j / 20) | 0]) |
        0),
      (m[1] = rol(m[1], 30)),
      m.pop(),
        m.unshift(t)
    }
    for (j = 0; j < 5; j++) m[j] = (m[j] + o[j]) | 0
  }
  t = new DataView(new Uint32Array(m).buffer)
  // eslint-disable-next-line no-redeclare
  for (var i = 0; i < 5; i++) m[i] = t.getUint32(i << 2)
  var hex = Array.prototype.map
    .call(new Uint8Array(new Uint32Array(m).buffer), function (e) {
      return (e < 16 ? '0' : '') + e.toString(16)
    })
    .join('')
  return hex
}
export function sortASCII (obj) {
  var arr = []
  var num = 0
  var add = ''
  for (var i in obj) {
    arr[num] = i
    num++
  }
  var sortArr = arr.sort()
  var sortObj = {}
  // eslint-disable-next-line no-redeclare
  for (var i in sortArr) {
    sortObj[sortArr[i]] = obj[sortArr[i]]
    add +=
      i !== sortArr.length - 1
      ? `${sortArr[i]}=${obj[sortArr[i]]}&`
      : `${sortArr[i]}=${obj[sortArr[i]]}` // 字符串拼接
  }
  return {
    sortObj: sortObj,
    add: `${add}`
  }
}
/**
 * 生成签名
 * @param  {Object} data 接口参数
 * @return {String}
 */
export function createSign (data, nonce, timestamp, privateKey) {
  const newData = {
    ...data
  }
  newData['private_key'] = privateKey
  newData['nonce'] = nonce
  newData['timestamp'] = timestamp

  let s = sortASCII(newData)
  s = sha1(s.add)
  return s
}
/**
 * 比较版本号大小
 * @param  {String|Number} 版本号
 * @return {Number}
 * // compareVersion('1.11.0', '1.9.9') // 1
 */

export function compareVersion (v1, v2) {
  v1 = v1.split('.')
  v2 = v2.split('.')
  const len = Math.max(v1.length, v2.length)

  while (v1.length < len) {
    v1.push('0')
  }
  while (v2.length < len) {
    v2.push('0')
  }

  for (let i = 0; i < len; i++) {
    const num1 = parseInt(v1[i])
    const num2 = parseInt(v2[i])

    if (num1 > num2) {
      return 1
    } else if (num1 < num2) {
      return -1
    }
  }

  return 0
}
