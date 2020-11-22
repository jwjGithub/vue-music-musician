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
export function uploadMusic(data) {
  return request({
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
