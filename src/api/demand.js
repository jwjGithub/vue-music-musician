import request from '@/utils/request'

// 查询需求列表
export function getList(data) {
  return request({
    url: '/company/needs/query',
    method: 'post',
    data: data
  })
}
