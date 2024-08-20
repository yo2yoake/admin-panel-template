import {defineStore} from "pinia"
import {type Ref, ref, watch} from "vue"
import {useRouter} from "vue-router"
import type {SimpleMenu, NestedMenu, Route} from "@/types"
import {useHeaderStore} from "@/store/header"
import type {RouteRecordRaw} from "vue-router"

export const useAsideStore = defineStore('AsideStore', () => {
  // 获取菜单数据
  let menuList: Array<SimpleMenu | NestedMenu> = []

  function updateMenuList() {
    menuList = JSON.parse(sessionStorage.getItem('menuList') || '[]')
  }

  // 分离有子菜单的菜单和无子菜单的菜单
  function getSimpleMenu(): Array<SimpleMenu> {
    return menuList.filter((item: SimpleMenu | NestedMenu) => {
      return (item as NestedMenu).children === undefined
    }) as Array<SimpleMenu>
  }

  function getNestedMenu(): Array<NestedMenu> {
    return menuList.filter((item: SimpleMenu | NestedMenu) => {
      return (item as NestedMenu).children !== undefined
    }) as Array<NestedMenu>
  }

  // 动态路由
  const router = useRouter()

  function createRoutes(menu: Array<SimpleMenu>): Array<Route> {
    const views = import.meta.glob('@/views/**/*.vue')
    return menu.map((item: SimpleMenu): Route => (
      {
        path: item.path,
        name: item.name,
        component: views[`/src/views/${item.url}.vue`],
      }
    ))
  }

  function updateRouter() {
    const routeList: Array<Route> = [
      ...createRoutes(getSimpleMenu()),
      ...createRoutes(getNestedMenu().flatMap((item: NestedMenu): Array<SimpleMenu> => item.children))
    ]
    routeList.forEach((route: Route) => router.addRoute('main', route as RouteRecordRaw))
    sessionStorage.setItem('routeList', JSON.stringify(routeList))
  }

  // 路由跳转和面包屑功能
  function clickMenu(item: SimpleMenu): void {
    // 路由跳转
    router.push({name: item.name})
    // 面包屑
    useHeaderStore().updateBreadcrumb(item)
  }

  function clearMenuList(){
    sessionStorage.removeItem('menuList')
    sessionStorage.removeItem('routeList')
    updateMenuList()
    updateRouter()
  }

  // 侧边栏的展开与折叠
  const isCollapse: Ref<boolean> = ref(false)

  function updateIsCollapse(): void {
    isCollapse.value = !isCollapse.value
  }

  // 处理侧边栏菜单默认active
  const activeIndex: Ref<string> = ref(sessionStorage.getItem('activeIndex') || '/home')

  watch(activeIndex, (newValue: string) => {
    sessionStorage.setItem('activeIndex', newValue)
  })

  return {
    menuList,
    updateMenuList,
    getSimpleMenu,
    getNestedMenu,
    updateRouter,
    clickMenu,
    clearMenuList,
    isCollapse,
    updateIsCollapse,
    activeIndex,
  }
})