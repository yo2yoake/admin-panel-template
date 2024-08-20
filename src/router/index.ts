import {createRouter, createWebHashHistory} from 'vue-router'
import {useAsideStore} from "@/store/aside";

const routes = [
  {
    path: '/',
    redirect: '/home',
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

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

let load: number = 0
router.beforeEach((to, from, next) => {
  if (load === 0 && useAsideStore().menuList) {
    load++
    useAsideStore().updateRouter()
    next({...to, replace: true})
    console.log(load)
  } else {
    next()
  }
})


export default router