import request from '@/utils/request'

// 校验用户名是否可用
export function verifyUserName(data) {
  return request({
    url: '/musician/signup/verifyUserName',
    method: 'post',
    data: data
  })
}
// 校验手机号是否可用
export function verifyMobile(data) {
  return request({
    url: '/musician/signup/verifyMobile',
    method: 'post',
    data: data
  })
}
// 校验邮箱是否可用
export function verifyEmail(data) {
  return request({
    url: '/musician/signup/verifyEmail',
    method: 'post',
    data: data
  })
}
// 音乐人注册申请
export function musicianSignUp(data) {
  return request({
    url: '/musician/signup/musicianSignUp',
    method: 'post',
    data: data
  })
}
// 获取音乐人工种
export function getMusicianProfession(data) {
  return request({
    url: '/musician/signup/getMusicianProfession',
    method: 'post',
    data: data
  })
}
