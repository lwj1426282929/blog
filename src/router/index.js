import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/home/blog'
  },
  {
    path: '/home/blog',
    name: 'blogList',
    component: () => import('@/views/blogList')
  },
  {
    path: '/home/blog/:id',
    name: 'blogView',
    component: () => import('@/views/blogView')
  },
  {
    path: '/home/blog/edit/markdown/:id',
    name: 'blogEditMarkdown',
    component: () => import('@/views/blogEdit/markdown')
  },
  {
    path: '/home/blog/edit/quill/:id',
    name: 'blogEditQuill',
    component: () => import('@/views/blogEdit/quill')
  }
]

const router = new Router({
  mode: 'history',
  routes
})

export default router
