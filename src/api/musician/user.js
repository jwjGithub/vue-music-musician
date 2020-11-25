/*
 * @Date: 2020-11-25 13:48:28
 * @Description: 个人中心
 * @LastEditors: JWJ
 * @LastEditTime: 2020-11-25 13:49:42
 * @FilePath: \vue-music-musician\src\api\musician\user.js
 */
import request from '@/utils/request'

// 个人曲库统计信息查询 包括 已发布作品数 已售出作品数 交易中作品数 卖出总金额
export function getUserWorkCountInfo(data) {
  return request({
    url: '/usercenter/userWorkCountInfo',
    method: 'post',
    data: data
  })
}
// 曲库信息查询接口-七天统计数据 包括最近七天浏览量 七日成交量 七日播放量
export function getUserWorkCountHisInfo(data) {
  return request({
    url: '/usercenter/userWorkCountHisInfo',
    method: 'post',
    data: data
  })
}
