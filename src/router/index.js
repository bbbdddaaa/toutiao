import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// SPA 收评加载速度恩满
// 路由懒加载
// - 使用到了路由页面，再去请求他
const routes = [
  {
    path: '/',
    component: () => import('@/views/Layout'),
    redirect: '/ ',
    children: [
      {
        path: '/ ',
        component: () => import('@/views/Home')
      },
      {
        path: '/video',
        component: () => import(/* webpackChunkName: "base" */ '@/views/Video')
      },
      {
        path: '/qa',
        component: () => import(/* webpackChunkName: "base" */ '@/views/Qa')
      },
      {
        path: '/profile',
        component: () => import('@/views/My')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/Login')
  }
]

const router = new VueRouter({
  routes
})

export default router
