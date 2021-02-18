// 概念说明：
// 防抖：就是指触发事件后在 n 秒内函数只能执行一次，如果在 n 秒内又触发了事件，则会重新计算函数执行时间。
// 节流：就是指连续触发事件但是在 n 秒中只执行一次函数。

// 参数说明
// immediate  是否需要立即执行(true立即执行/false不立即执行),默认立即执行
// key 防抖的关键词(用于标记防抖的关键词,可以通过此关键词连链接任意的事件,比如用户点击立即付款,非常快的又点击了取消订单,两个方法传同样的key即可解决)
// time  防抖时间(多少时间内生效(防抖模式(默认300ms)/节流模式(默认不锁定,需要手动解锁))),

//  this.$debounce.canDoFunction({
// 	time:3000,
//  immediate:true,
// 	key:"orderAction",
// 	success:()=>{
//  由于我传了time，并且立即执行，所以我被console了，且time时间内（3000毫秒）不会重复触发
// 		uni.showToast({
// 			title:'支付订单'
// 		})
// 	}
// })

const _defaults = {
  key: '_default',
  immediate: false,
  time: 300,
  success: () => {}
}
class Debounce {
  constructor (option) {
    this._defaults = option || {}
    this.keyList = {}
  }
  debounce (config = {}) {
    const promise = new Promise()
    config = Object.assign({}, this._defaults, config)
    config.immediate = config.immediate ? config.immediate : true
    const { success, key, immediate, time } = config
    if (immediate && !this.keyList[key]) {
      success && success()
      promise.resolve()
    }
    clearTimeout(this.keyList[key])
    this.keyList[key] = setTimeout(() => {
      if (!immediate) {
        success && success()
        promise.resolve()
      }
      this.release(key)
    }, time)
    return promise
  }
  throttle (config = {}) {
    const promise = new Promise()
    config = Object.assign({}, this._defaults, config)
    config.immediate = config.immediate ? config.immediate : true
    const { success, key, immediate, time } = config
    if (!this.keyList[key]) {
      if (immediate) {
        this.lock(key)
        success && success()
        promise.resolve()
      } else {
        this.lock(key)
      }
      setTimeout(() => {
        if (!immediate) {
          success && success()
          promise.resolve()
        }
        this.release(key)
      }, time)
    }
    return promise
  }
  release (key) {
    delete this.keyList[key]
  }
  lock (key) {
    this.keyList[key] = true
  }
}

const instance = new Debounce(_defaults)

export const debounce = (config = {}) => { return instance.debounce(config) }
export const throttle = (config = {}) => { return instance.throttle(config) }

export default {
  debounce,
  throttle
}
