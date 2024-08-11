import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/HomePage',
    component: () => import('@/views/Main.vue'),
    children: [
      {
        path: '/HomePage',
        name: 'home',
        component: () => import('@/views/HomePage/Index.vue')
      },
      {
        path: '/UserManagement',
        name: 'user',
        component: () => import('@/views/UserManagement/Index.vue')
      },
      {
        path: '/more1',
        name: 'more1',
        component: () => import('@/views/MoreMenu/More1.vue')
      },
      {
        path: '/more2',
        name: 'more2',
        component: () => import('@/views/MoreMenu/More2.vue')
      },
    ]
  }
]

export default createRouter({
  history: createWebHashHistory(),
  routes
})