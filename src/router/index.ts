import {createRouter, createWebHashHistory} from 'vue-router'

const routes = [
  {
    path: '/',
    // redirect: '/home',
    name: 'main',
    component: () => import('@/views/Main.vue'),
    children: JSON.parse(sessionStorage.getItem('routeList') || '[]')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginPage/index.vue')
  }
]

export default createRouter({
  history: createWebHashHistory(),
  routes
})