import axios from 'axios'
// import router from '@/router'
import { Notification, MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken, removeToken } from '@/utils/auth'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: process.env.VUE_APP_BASE_API,
  // 超时
  timeout: 10000
})
// request拦截器
service.interceptors.request.use(
  config => {
    if (getToken()) {
      config.headers['accessToken'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
      return config
    } else {
      let url = window.location.href
      if (url.indexOf('/login') !== -1) {
        return config
      } else {
        MessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录',
          '系统提示',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
        return Promise.reject(new Error('登录已过期'))
      }
    }
  },
  error => {
    Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(res => {
  const code = res.data.code
  if (code === 9050 || code === 9104) {
    removeToken() // 删除token
    MessageBox.confirm(
      (code === 9050 ? '登录状态已过期' : '没有权限访问') + '，您可以继续留在该页面，或者重新登录',
      '系统提示',
      {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }
    ).then(() => {
      store.dispatch('FedLogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    })
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
  // console.log(error.response)
  Message({
    message: error.response.status === 404 ? '网络异常 404' : error.message,
    type: 'error',
    duration: 5 * 1000
  })
  return Promise.reject(error)
}
)

export default service
