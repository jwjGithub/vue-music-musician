/*
 * @Date: 2020-11-13 11:55:52
 * @Description: 设置页面标题
 * @LastEditors: JWJ
 * @LastEditTime: 2020-11-13 11:56:34
 * @FilePath: \vue-music-musician\src\utils\get-page-title.js
 */

const title = 'Music 系统'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
