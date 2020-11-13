import request from '@/utils/request'

// 获取公司注册手机验证码
export function getCompanyPhoneVerificationCode(data) {
  return request({
    url: '/company/signup/do_mobile_username_verification',
    method: 'post',
    data: data
  })
}
// 获取公司注册邮箱验证码
export function getCompanyEmailVerificationCode(data) {
  return request({
    url: '/company/signup/do_email_verification',
    method: 'post',
    data: data
  })
}
// 公司注册保存
export function saveCompanyRegister(data) {
  return request({
    url: '/company/signup/do_com_signup_request',
    method: 'post',
    data: data
  })
}
// 验证验证码
export function validityCode(data) {
  return request({
    url: '/sys/sms/doVerCode',
    method: 'post',
    data: data
  })
}
// 上传公司资质
export function uploadLisence(data) {
  return request({
    url: '/company/signup/uploadLisence',
    method: 'post',
    data: data
  })
}
