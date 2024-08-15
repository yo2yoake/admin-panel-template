// 侧边栏菜单

export interface MenuWithoutChildrenInter {
  path: string
  name: string
  label: string
  icon: string
  url: string
}

export interface MenuWithChildrenInter {
  label: string
  icon: string
  path: string
  children: Array<MenuWithoutChildrenInter>
}

// 用户管理模块

export interface UserDataInter {
  userId?: string,
  userName: string,
  userAddress: string,
  userAge: number,
  userBirth: string,
  userGender: 0 | 1
}