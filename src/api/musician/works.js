/*
 * @Date: 2020-11-30 11:40:57
 * @Description: 作品管理
 * @LastEditors: JWJ
 * @LastEditTime: 2020-11-30 11:52:01
 * @FilePath: \vue-music-musician\src\api\musician\works.js
 */

import request from '@/utils/request'

// 全部作品列表查询接口 ,可以根据发布状态、出售状态、作品类型 条件进行过滤
export function getUserAllMusicListPage(data) {
  return request({
    url: '/music/base/getUserAllMusicListPage',
    method: 'post',
    data: data
  })
}
// 待出售数据列表查询接口
export function getUserOnSaleListPage(data) {
  return request({
    url: '/music/base/getUserOnSaleListPage',
    method: 'post',
    data: data
  })
}
// 已出售数据列表查询接口
export function getUserSoldListPage(data) {
  return request({
    url: '/music/base/getUserSoldListPage',
    method: 'post',
    data: data
  })
}
// 优先推送作品列表查询接口
export function getUserPushListPage(data) {
  return request({
    url: '/music/base/getUserPushListPage',
    method: 'post',
    data: data
  })
}
// 用户作品发布状态更新接口
export function updateUserMusicPostStatus(id) {
  return request({
    url: `/music/base/updateUserMusicPostStatus/${id}`,
    method: 'post'
  })
}
