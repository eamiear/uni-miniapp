<script>
/* eslint-disable no-undef */
import Vue from 'vue'
import config from '@/config/defaultSettings'
import { log } from '@/utils/log'
import { getLastVersion } from '@/api/system'
import { isAjaxSuccess } from '@/utils/util'

export default Vue.extend({
	mpType: 'app',
	onLaunch () {
    const info = uni.getSystemInfoSync()
    info.versionCode = 0
    info.version = config.info.version
    info.appVersion = config.info.version
    console.log(info)

    const iPhone = info.model && info.model.indexOf('iPhone') !== -1
    info.titleBarHeight = iPhone ? 44 : 48

    // 小程序升级检测
    // #ifdef MP-WEIXIN
      if (uni.canIUse('getUpdateManager')) {
        const updateManager = uni.getUpdateManager()
        updateManager.onCheckForUpdate((res) => {
          if (res.hasUpdate) {
            updateManager.onUpdateReady(() => {
              uni.showModal({
                title: '升级提示',
                content: '新版本已经为您准备就绪，是否升级应用？',
                success: (res) => {
                  if (res.confirm) updateManager.applyUpdate()
                }
              })
            })
          }
        })
      }
    // #endif

    // APP版本更新
    // #ifdef APP-PLUS
      plus.runtime.getProperty(plus.runtime.appid, (wgtInfo) => {
        info.versionCode = wgtInfo.versionCode
        info.version = wgtInfo.version

        // Android
        if (String(info.platform).toLowerCase === 'android') {
          // log()
          getLastVersion().then(res => {
            log('last version: ', res)
            if (isAjaxSuccess(res.code) && res.result.version) {
              log('当前版本：', info.versionCode, '最新版本：', res.result.version)
              if (info.versionCode > res.result.version) {
                uni.showModal({
                  title: '温馨提示',
                  content: '发现新版本APP，您是否要升级体验？',
                  cancelText: '暂时忽略',
                  confirmText: '马上升级',
                  success: (res) => {
                    if (res.confirm) {
                      log('确认升级')
                      plus.runtime.openURL(res.reuslt.url)
                    } else if (res.cancel) { log('取消升级') }
                  }
                })
              }
            }
          })
        }
      })
    // #endif
	},
	onShow () {
		console.log('App Show')
	},
	onHide () {
		console.log('App Hide')
	}
})
</script>

<style>
    /*每个页面公共css */
</style>
