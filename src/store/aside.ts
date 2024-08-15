import {defineStore} from "pinia"
import {ref, watch} from "vue"
import {useRouter} from "vue-router"
import type {MenuWithoutChildrenInter, MenuWithChildrenInter} from "@/types"
import {useHeaderStore} from "@/store/header"

export const useAsideStore = defineStore('AsideStore', () => {

  // 定义数据
  const menuList: Array<MenuWithoutChildrenInter | MenuWithChildrenInter> = [
    {
      path: '/',
      userName: 'home',
      label: '首页',
      icon: 'HomeFilled',
      url: 'Home/Home'
    },
    {
      path: '/UserManagement',
      userName: 'user',
      label: '用户管理',
      icon: 'UserFilled',
      url: 'User/User'
    },
    {
      label: '更多',
      icon: 'MoreFilled',
      path: '/MoreMenu',
      children: [
        {
          path: '/more1',
          userName: 'more1',
          label: '更多-1',
          icon: 'setting',
          url: 'More/One'
        },
        {
          path: '/more2',
          userName: 'more2',
          label: '更多-2',
          icon: 'setting',
          url: 'More/Two'
        }
      ]
    }
  ]

  // 分离有子菜单的菜单和无子菜单的菜单
  function hasChildren(item: MenuWithChildrenInter | MenuWithoutChildrenInter): item is MenuWithChildrenInter {
    return (item as MenuWithChildrenInter).children !== undefined
  }

  function getMenuWithoutChildren(): Array<MenuWithoutChildrenInter> {
    return menuList.filter((item) => !hasChildren(item)) as Array<MenuWithoutChildrenInter>
  }

  function getMenuWithChildren(): Array<MenuWithChildrenInter> {
    return menuList.filter((item) => hasChildren(item)) as Array<MenuWithChildrenInter>
  }

  // 路由跳转和面包屑功能
  const router = useRouter()

  function clickMenu(item: MenuWithoutChildrenInter): void {
    // 路由跳转
    router.push({userName: item.name})
    // 面包屑
    useHeaderStore().updateBreadcrumb(item)
  }

  // 侧边栏的展开与折叠
  const isCollapse = ref(false)

  function updateIsCollapse(): void {
    isCollapse.value = !isCollapse.value
  }

  // 处理侧边栏菜单默认active
  const activeIndex = ref(localStorage.getItem('activeIndex') || '/')

  watch(activeIndex, (newValue: string) => {
    localStorage.setItem('activeIndex', newValue)
  })

  return {
    getMenuWithChildren,
    getMenuWithoutChildren,
    clickMenu,
    activeIndex,
    isCollapse,
    updateIsCollapse,
  }
})