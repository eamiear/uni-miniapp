import Vue from 'vue'
import App from './App.vue'

import store from './store'
import { VueBus } from './utils/vue-bus'
import logic, { showLoading, hideLoading, showToastError, showToastSuccess, showModal, showConfirm } from './utils/logic'
import router from './utils/router'
import { isAjaxSuccess } from './utils/util'
import logger from './utils/log'

// 启动mock
import './mock'
import storage from './utils/storage'

Vue.config.productionTip = false

Vue.use(VueBus)

Vue.prototype.$logic = logic
Vue.prototype.$showLoading = showLoading
Vue.prototype.$hideLoading = hideLoading
Vue.prototype.$showToastError = showToastError
Vue.prototype.$showToastSuccess = showToastSuccess
Vue.prototype.$showModal = showModal
Vue.prototype.$showConfirm = showConfirm
Vue.prototype.$$router = router
Vue.prototype.$isAjaxSuccess = isAjaxSuccess
Vue.prototype.$logger = logger
Vue.prototype.$storage = storage
// Object.defineProperties(Vue.prototype, {
//   _$route: {
//     get () { return router }
//   }
// })

const app = new Vue({
  store,
  ...App
})
app.$mount()
