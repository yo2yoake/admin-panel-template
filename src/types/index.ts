// 侧边栏菜单

export interface SimpleMenu {
  path: string
  name: string
  label: string
  icon: string
  url: string
}

export interface NestedMenu {
  label: string
  icon: string
  path: string
  children: Array<SimpleMenu>
}

// 用户管理模块

export interface UserData {
  userId?: string,
  userName: string,
  userAddress: string,
  userAge: number,
  userBirth: string,
  userGender: 0 | 1
}

// 路由

export interface Route {
  path: string,
  name: string,
  component: () => Promise<typeof import('*.vue')>
  children?: Array<Route>,
  redirect?: string
}