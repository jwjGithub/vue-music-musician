/*
 * @Date: 2020-11-13 09:28:53
 * @Description: 过滤器
 * @LastEditors: JWJ
 * @LastEditTime: 2020-11-13 14:07:42
 * @FilePath: \vue-music-musician\src\permission.js
 */
import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken, setToken } from '@/utils/auth'
import getPageTitle from '@/utils/get-page-title'
NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/auth-redirect', '/bind', '/register']
router.beforeEach((to, from, next) => {
  if (to.query.token) {
    setToken(to.query.token)
  }
  NProgress.start()
  document.title = getPageTitle(to.meta.title)
  if (getToken()) {
    if (!store.getters.userInfo.userId) {
      store.dispatch('GetInfo').then(() => {
        next()
      })
    } else {
      next()
    }

    // 判断当前是否已经添加路由
    // if (store.getters.permission_routes.length === 0) {
    //   store.dispatch('GenerateRoutes').then(accessRoutes => {
    //     router.addRoutes(accessRoutes) // 动态添加可访问路由表
    //     next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
    //   })
    // } else {
    //   next()
    // }
  } else {
    // 没有token
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next()
    } else {
      // 否则全部重定向到曲库
      window.location = 'http://47.94.21.246:9081/'
      // next()
      // next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
