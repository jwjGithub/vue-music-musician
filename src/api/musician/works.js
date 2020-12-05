/*
 * @Date: 2020-11-30 11:40:57
 * @Description: 作品管理
 * @LastEditors: jwj
 * @LastEditTime: 2020-12-05 20:23:57
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
// 已下架作品查询接口
export function getUserOffShelfListPage(data) {
  return request({
    url: '/music/base/getUserOffShelfListPage',
    method: 'post',
    data: data
  })
}
// 音乐人草稿箱列表查询接口
export function getUserUnpublishedListPage(data) {
  return request({
    url: '/music/base/getUserUnpublishedListPage',
    method: 'post',
    data: data
  })
}
// 用户作品发布状态更新接口 postStatus:发布状态 0 待发布 1 已发布 -1 删除
export function updateUserMusicPostStatus(data) {
  return request({
    url: `/music/base/updateUserMusicPostStatus/${data.id}`,
    method: 'post',
    data: data
  })
}
// 用户作品价格更新接口
export function updateUserMusicPrice(data) {
  return request({
    url: `/music/base/updateUserMusicPrice/${data.id}`,
    method: 'post',
    data: data
  })
}
// 作品上下架接口
export function updateUserMusicSaleStatus(data) {
  return request({
    url: `music/base/updateUserMusicSaleStatus/${data.id}`,
    method: 'post',
    data: data
  })
}
// 查询作品预留公司信息接口
export function getOptionalComInfo(data) {
  return request({
    url: `/music/base/getOptionalComInfo/${data.id}`,
    method: 'post',
    data: data
  })
}
