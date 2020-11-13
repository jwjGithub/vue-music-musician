/*
 * @Date: 2020-11-13 09:28:54
 * @Description: token配置
 * @LastEditors: JWJ
 * @LastEditTime: 2020-11-13 11:54:24
 * @FilePath: \vue-music-musician\src\utils\auth.js
 */
import Cookies from 'js-cookie'

const TokenKey = 'vue_music_musician_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
