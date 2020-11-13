/*
 * @Date: 2020-11-12 16:27:56
 * @Description: 忘记密码
 * @LastEditors: JWJ
 * @LastEditTime: 2020-11-12 16:31:25
 * @FilePath: \vue-music\src\api\resetPass.js
 */
import request from '@/utils/request'

// 判断身份证是否在系统内
export function hasIdCard(data) {
  return request({
    url: '/sys/user/hasIdCard',
    method: 'post',
    data: data
  })
}
// 获取验证码
export function getVerificationCode(data) {
  return request({
    url: '/sys/user/checkMobileOrEmailForForgetPasswordChange',
    method: 'post',
    data: data
  })
}
// 修改密码
export function saveUpdatePass(data) {
  return request({
    url: '/sys/user/updatePasswordForForgetPasswordChange',
    method: 'post',
    data: data
  })
}
