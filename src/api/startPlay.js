import request from '@/utils/request'

// 获取当前登录人默认播放列表
export function getUserDefaultMusicList(data) {
  return request({
    url: '/music/base/getUserDefaultMusicList',
    method: 'post',
    data: data
  })
}
// 获取当前登录人历史播放列表
export function getUserHisMusicList(data) {
  return request({
    url: '/music/base/getUserHisMusicList',
    method: 'post',
    data: data
  })
}
// 获取当前登录人（音乐人）收藏播放列表
export function getUserCollectMusicList(data) {
  return request({
    url: '/music/base/getUserCollectMusicList',
    method: 'post',
    data: data
  })
}
// 获取当前登录人所在公司自选库列表
export function getCompanyOptionalBaseList(data) {
  return request({
    url: '/music/base/getCompanyOptionalBaseList',
    method: 'post',
    data: data
  })
}
// 获取获取自选库音乐播放列表
export function getCompanyOptionalMusicList(data) {
  return request({
    url: '/music/base/getCompanyOptionalMusicList',
    method: 'post',
    data: data
  })
}
// 获取音乐信息
export function getMusicInfo(data) {
  return request({
    url: '/music/base/getMusicInfo',
    method: 'post',
    data: data
  })
}
// 添加到收藏列表
export function addToCollect(data) {
  return request({
    url: '/music/base/addToCollect',
    method: 'post',
    data: data
  })
}
// 从收藏列表移除
export function removeFromCollect(data) {
  return request({
    url: '/music/base/removeFromCollect',
    method: 'post',
    data: data
  })
}
// 添加到默认列表
export function addToDefault(data) {
  return request({
    url: '/music/base/addToDefault',
    method: 'post',
    data: data
  })
}
// 从默认列表移除
export function removeFromDefault(data) {
  return request({
    url: '/music/base/removeFromDefault',
    method: 'post',
    data: data
  })
}
// 从历史列表移除
export function removeFromhistory(data) {
  return request({
    url: '/music/base/removeFromhistory',
    method: 'post',
    data: data
  })
}
// 添加到自选库列表
export function addToCompanyOptional(data) {
  return request({
    url: '/music/base/addToCompanyOptional',
    method: 'post',
    data: data
  })
}
// 从自选库列表移除
export function removeFromCompanyOptional(data) {
  return request({
    url: '/music/base/removeFromCompanyOptional',
    method: 'post',
    data: data
  })
}
// 获取歌词
export function getLrc(data) {
  return request({
    url: '/music/base/getLrc',
    method: 'post',
    data: data
  })
}
