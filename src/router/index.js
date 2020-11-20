/*
 * @Date: 2020-11-13 09:28:54
 * @Description: 路由配置
 * @LastEditors: JWJ
 * @LastEditTime: 2020-11-20 14:33:13
 * @FilePath: \vue-music-musician\src\router\index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
import Layout from '@/views/layout/index'
const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/uploadWorks',
    children: [{
      path: 'uploadWorks',
      name: 'UploadWorks',
      component: () => import('@/views/uploadWorks/index'),
      meta: { title: '上传作品' }
    }]
  }
  // {
  //   path: '/demand',
  //   name: 'Demand',
  //   meta: { title: '需求列表' },
  //   component: () => import('@/views/demand/index')
  // },
  // {
  //   path: '/register',
  //   name: 'Register',
  //   meta: { title: '注册' },
  //   component: () => import('@/views/register/index'),
  //   redirect: '/register/company',
  //   children: [
  //     {
  //       path: 'company',
  //       name: 'RegisterCompany',
  //       meta: { title: '公司注册' },
  //       component: () => import('@/views/register/company/index')
  //     },
  //     {
  //       path: 'musician',
  //       name: 'RegisterMusician',
  //       meta: { title: '音乐人注册' },
  //       component: () => import('@/views/register/musician/index')
  //     }
  //   ]
  // },
  // {
  //   path: '/resetPass',
  //   name: 'FesetPass',
  //   meta: { title: '找回密码' },
  //   component: () => import('@/views/resetPass/index')
  // },
  // {
  //   path: '/feedback',
  //   name: 'Feedback',
  //   meta: { title: '问题反馈' },
  //   component: () => import('@/views/feedback/index')
  // },
  // {
  //   path: '/ranking',
  //   name: 'Ranking',
  //   meta: { title: '榜单' },
  //   component: () => import('@/views/ranking/index')
  // },
  // {
  //   path: '/startPlay',
  //   name: 'StartPlay',
  //   meta: { title: '播放列表' },
  //   component: () => import('@/views/startPlay')
  // }
]

const router = new VueRouter({
  routes
})

export default router
