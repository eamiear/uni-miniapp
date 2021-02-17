/* eslint-disable no-undef */
/*
 * @Author: eamiear
 * @Date: 2021-02-13 10:08:40
 * @Last Modified by: eamiear
 * @Last Modified time: 2021-02-15 23:28:51
 */
import { getLastVersion } from '@/api/system'
import { isAjaxSuccess } from '@/utils/util'
import config from '@/config/defaultSettings'
import { log } from '@/utils/log'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import storage from '@/utils/storage'
import router from '@/utils/router'

const updateVersionInfo = () => {
  const info = uni.getSystemInfoSync()
  info.versionCode = 0
  info.version = config.info.version
  info.appVersion = config.info.version
  log(info)

  const iPhone = info.model && info.model.indexOf('iPhone') !== -1
  info.titleBarHeight = iPhone ? 44 : 48
  return info
}

/**
 * 小程序更新
 */
export const updateMiniappManager = () => {
  if (uni.canIUse('getUpdateManager')) {
    const updateManager = uni.getUpdateManager()
    updateManager.onCheckForUpdate((res) => {
      if (res.hasUpdate) {
        updateManager.onUpdateReady(() => {
          showModal({
            title: '升级提示',
            content: '新版本已经为您准备就绪，是否升级应用？'
          }).then(() => {
            updateManager.applyUpdate()
          })
        })
      }
    })
  }
}

/**
 * APP 更新
 */
export const updateNativeAppManager = () => {
  const info = updateVersionInfo()
  plus.runtime.getProperty(plus.runtime.appid, (wgtInfo) => {
    info.versionCode = wgtInfo.versionCode
    info.version = wgtInfo.version

    // Android
    if (String(info.platform).toLowerCase === 'android') {
      const appid = plus.runtime.appid
      const version = plus.runtime.version
      getLastVersion(appid, version).then(res => {
        log('last version: ', res)
        if (isAjaxSuccess(res.code) && res.result.version) {
          log('当前版本：', info.versionCode, '最新版本：', res.result.version)
          if (info.versionCode > res.result.version) {
            showConfirm({
              title: '更新提示',
              content: '发现新版本APP，您是否要升级体验？',
              cancelText: '暂时忽略',
              confirmText: '马上升级'
            }).then(res => {
              uni.downloadFile({
                url: res.reuslt.url,
                success: (response) => {
                  if (response.statusCode === 200) {
                    plus.runtime.openURL(res.reuslt.url, () => {
                      showToastError('安装失败')
                    })
                  }
                },
                fail: () => {
                  plus.nativeUI.alert('下载更新文件失败')
                }
              })
            })
          }
        }
      })
    }
  })
}

export const checkPermission = () => {
  if (config.forceLogin) {
    storage.get(ACCESS_TOKEN) ? router.toHome() : router.toLogin()
  }
}

export const getNetworkType = () => {
  uni.getNetworkType({
    success: (res) => {
      console.log(res.networkType)
    }
  })
}

export const showLoading = (title = '加载中', mask = false) => {
  uni.showLoading({ title, mask })
}
export const hideLoading = () => {
  uni.hideLoading()
}

export const showToastError = (title = '') => {
  uni.showToast({
    title,
    icon: 'none'
  })
}
export const showToastSuccess = (title = '') => {
  uni.showToast({ title })
}
export const showModal = (params = {}) => {
  return new Promise((resolve, reject) => {
    uni.showModal({
      showCancel: false,
      ...params,
      success: (res) => {
        if (res.confirm) resolve(res)
        if (res.cancel) reject(res)
      },
      fail: reject
    })
  })
}
export const showConfirm = (params = {}) => {
  const options = {
    cancelText: '取消',
    confirmText: '确认'
  }
  return showModal(Object.assign({}, options, params))
}

export const login = (provider = '') => {
  return new Promise((resolve, reject) => {
    uni.login({
      provider,
      success: (res) => {
        if (res.code) {
          resolve(res.code)
        } else {
          showToastError('登录失败！' + res.errMsg)
          reject(res)
        }
      },
      fail: reject
    })
  })
}

export default {
  updateMiniappManager,
  updateNativeAppManager,
  checkPermission,
  showLoading,
  hideLoading,
  showToastError,
  showToastSuccess,
  showModal,
  showConfirm,
  login
}
