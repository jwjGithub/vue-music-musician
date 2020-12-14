/*
 * @Date: 2020-11-13 09:28:53
 * @Description:
 * @LastEditors: jwj
 * @LastEditTime: 2020-12-14 23:32:17
 * @FilePath: \vue-music-musician\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import './assets/styles/element-variables.scss'
import './assets/styles/index.scss' // global css
import './permission' // permission control
// 全局组件引入
import MusHeader from '@/components/page/MusHeader'
import MusFooter from '@/components/page/MusFooter'
import MusDialog from '@/components/MusDialog'
import Pagination from '@/components/Pagination'

// 全局方法引入
import { goLocation, parseTime, resetForm, goMusic } from '@/utils/index'
import { getToken } from '@/utils/auth'
Vue.prototype.baseURL = process.env.VUE_APP_BASE_API
Vue.config.productionTip = false

// 全局方法挂载
Vue.prototype.goLocation = goLocation
Vue.prototype.parseTime = parseTime
Vue.prototype.resetForm = resetForm
Vue.prototype.getToken = getToken
Vue.prototype.goMusic = goMusic
// 路由跳转
Vue.prototype.Go = function(url, query) {
  router.push({
    path: url,
    query
  }).catch(() => {

  })
}
Vue.prototype.GoWindow = function(url) {
  window.open(url)
}
// 全局组件挂载
Vue.component('MusHeader', MusHeader)
Vue.component('MusFooter', MusFooter)
Vue.component('MusDialog', MusDialog)
Vue.component('Pagination', Pagination)
Vue.use(Element)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
