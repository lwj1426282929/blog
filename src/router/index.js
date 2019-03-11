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
    path: '/blog/edit/markdown/:id',
    name: 'blogEditMarkdown',
    component: () => import('@/views/blogEdit/markdown')
  },
  {
    path: '/blog/edit/quill/:id',
    name: 'blogEditQuill',
    component: () => import('@/views/blogEdit/quill')
  }
]

const router = new Router({
  routes
})

export default router
