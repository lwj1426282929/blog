import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/blog'
  },
  {
    path: '/blog',
    name: 'blogList',
    component: () => import('@/views/blogList')
  },
  {
    path: '/blog/:id',
    name: 'blogView',
    component: () => import('@/views/blogView')
  },
  {
    path: '/blog/edit/:id',
    name: 'blogEdit',
    component: () => import('@/views/blogEdit')
  }
]

const router = new Router({
  routes
})

export default router
