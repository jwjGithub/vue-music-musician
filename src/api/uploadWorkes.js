/*
 * @Date: 2020-11-23 09:29:25
 * @Description: 上传作品接口
 * @LastEditors: JWJ
 * @LastEditTime: 2021-01-28 11:37:33
 * @FilePath: \vue-music-musician\src\api\uploadWorkes.js
 */
import request from '@/utils/request'

// 模糊搜索站内音乐人
export function searchMusicians(data) {
  return request({
    url: '/musician/searchMusicians',
    method: 'post',
    data: data
  })
}

// 获取风格标签列表
export function getTagsByType(data) {
  return request({
    url: '/sys/dictionary/getTagsByType',
    method: 'post',
    data: data
  })
}
// 上传音乐作品附件(mp3)
export function uploadMusic(data, source) {
  return request({
    cancelToken: source ? source.token : '', // 每次请求取消凭证;
    url: '/music/base/uploadMusic',
    method: 'post',
    data: data
  })
}
// 保存作品
export function saveWork(data) {
  return request({
    url: '/music/base/uploadWork',
    method: 'post',
    data: data
  })
}
// 获取上传作品信息
export function getMusicUploadInfo(data) {
  return request({
    url: '/music/base/getMusicUploadInfo',
    method: 'post',
    data: data
  })
}
