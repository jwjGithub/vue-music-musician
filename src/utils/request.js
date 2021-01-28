import axios from 'axios'
import router from '@/router'
import { Notification, MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken, removeToken } from '@/utils/auth'
let messageObj
let cancel
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: process.env.VUE_APP_BASE_API,
  // 超时
  timeout: 100000
})

// request拦截器
service.interceptors.request.use(
  config => {
    // config.headers['token'] = '1b253bb6e8efcbf8cdfc3404c3f8562a' // 让每个请求携带自定义token 请根据实际情况自行修改
    config.headers['token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    return config
    // if (getToken()) {
    //   config.headers['token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    //   return config
    // } else {
    // let url = window.location.href
    // if (url.indexOf('/login') !== -1) {
    //   return config
    // } else {
    //   MessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录',
    //     '系统提示',
    //     {
    //       confirmButtonText: '重新登录',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //     }
    //   ).then(() => {
    //     store.dispatch('user/resetToken').then(() => {
    //       location.reload() // 为了重新实例化vue-router对象 避免bug
    //     })
    //   })
    //   return Promise.reject(new Error('登录已过期'))
    // }
    // }
  },
  error => {
    Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(res => {
  const code = res.data.code
  if (code === 401 || code === 9104) {
    removeToken() // 删除token
    if (messageObj === undefined) {
      messageObj = MessageBox.confirm(
        (code === 401 ? '登录状态已过期' : '没有权限访问') + '，您可以继续留在该页面，或者返回主页',
        '系统提示',
        {
          confirmButtonText: '返回主页',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        messageObj = undefined
        router.push({
          path: '/'
        }).catch(() => {

        })
        // store.dispatch('user/resetToken').then(() => {
        //   location.reload() // 为了重新实例化vue-router对象 避免bug
        // })
      }).catch(() => {
        messageObj = undefined
      })
    }
    return Promise.reject('error')
  } else if (code !== 0) {
    Notification.error({
      title: res.data.msg
    })
    return Promise.reject('error')
  } else {
    return res.data
  }
},
error => {
  if (axios.isCancel(error)) {
    // 中断promise链接
    return new Promise(() => {})
  } else {
    Message({
      message: error.response.status === 404 ? '网络异常 404' : error.message,
      type: 'error',
      duration: 5 * 1000
    })
    // 把错误继续向下传递
    return Promise.reject(error)
  }

  // return Promise.reject(error)
})

export default service
