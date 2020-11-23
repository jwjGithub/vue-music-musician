/*
 * @Date: 2020-11-13 09:28:53
 * @Description: 登录基础接口
 * @LastEditors: JWJ
 * @LastEditTime: 2020-11-23 10:28:08
 * @FilePath: \vue-music-musician\src\api\login.js
 */
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
// 获取音乐人信息
export function getUserInfo(data) {
  return request({
    url: '/sys/user/musicianinfo',
    method: 'get',
    data: data
  })
}
