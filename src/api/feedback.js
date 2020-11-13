import request from '@/utils/request'

// 问题反馈提交
export function saveQuestion(data) {
  return request({
    url: '/sys/feedback/saveQuestion',
    method: 'post',
    data: data
  })
}
