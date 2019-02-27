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
    name: 'article',
    component: () => import('@/views/blogArticle')
  }
]

export default new Router({
  routes
})
