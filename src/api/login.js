import request from '@/utils/request'

// 音乐人登录
export function musicianLogin(data) {
  return request({
    url: '/musician/login',
    method: 'post',
    data: data
  })
}
// 公司用户登录
export function companyLogin(data) {
  return request({
    url: '/company/login',
    method: 'post',
    data: data
  })
}
