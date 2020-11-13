import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    meta: { title: '首页' },
    component: () => import('@/views/index')
  },
  {
    path: '/demand',
    name: 'Demand',
    meta: { title: '需求列表' },
    component: () => import('@/views/demand/index')
  },
  {
    path: '/register',
    name: 'Register',
    meta: { title: '注册' },
    component: () => import('@/views/register/index'),
    redirect: '/register/company',
    children: [
      {
        path: 'company',
        name: 'RegisterCompany',
        meta: { title: '公司注册' },
        component: () => import('@/views/register/company/index')
      },
      {
        path: 'musician',
        name: 'RegisterMusician',
        meta: { title: '音乐人注册' },
        component: () => import('@/views/register/musician/index')
      }
    ]
  },
  {
    path: '/resetPass',
    name: 'FesetPass',
    meta: { title: '找回密码' },
    component: () => import('@/views/resetPass/index')
  },
  {
    path: '/feedback',
    name: 'Feedback',
    meta: { title: '问题反馈' },
    component: () => import('@/views/feedback/index')
  },
  {
    path: '/ranking',
    name: 'Ranking',
    meta: { title: '榜单' },
    component: () => import('@/views/ranking/index')
  },
  {
    path: '/startPlay',
    name: 'StartPlay',
    meta: { title: '播放列表' },
    component: () => import('@/views/startPlay')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
