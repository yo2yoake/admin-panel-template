// 管理整个项目的API
import request from './request'
import type {UserDataInter} from "@/types";


export default {
  /**
   * 首页API
   */
  getSalesData() {
    return request({
      url: '/home/getSalesData',
      method: 'get',
      isMock: true
    })
  },
  getOrderData() {
    return request({
      url: '/home/getOrderData',
      method: 'get',
      isMock: true
    })
  },
  getSalesTrendData() {
    return request({
      url: '/home/getSalesTrendData',
      method: 'get',
      isMock: true
    })
  },
  getUserActivityData() {
    return request({
      url: '/home/getUserActivityData',
      method: 'get',
      isMock: true
    })
  },
  getSalesShareData() {
    return request({
      url: '/home/getSalesShareData',
      method: 'get',
      isMock: true
    })
  },

  /**
   * 用户管理页面API
   */
  getUserList(pageIndex: number, pageSize: number) {
    return request({
      url: '/user/getUserList',
      method: 'get',
      isMock: true,
      data: {
        pageIndex,
        pageSize
      }
    })
  },

  searchUser(keyWord: string) {
    return request({
      url: '/user/getUserList',
      method: 'get',
      isMock: true,
      data: {
        keyWord
      }
    })
  },

  addUser(userData: UserDataInter) {
    return request({
      url: '/user/createUser',
      method: 'post',
      isMock: true,
      data: {
        userName: userData.userName,
        userAge: userData.userAge,
        userGender: userData.userGender,
        userBirth: userData.userBirth,
        userAddress: userData.userAddress
      }
    })
  },

  editUser(userData: UserDataInter) {
    return request({
      url: '/user/updateUser',
      method: 'post',
      isMock: true,
      data: {
        userId: userData.userId,
        userName: userData.userName,
        userAge: userData.userAge,
        userGender: userData.userGender,
        userBirth: userData.userBirth,
        userAddress: userData.userAddress
      }
    })
  },

  deleteUser(userId: string) {
    return request({
      url: '/user/deleteUser',
      method: 'post',
      isMock: true,
      data: {
        userId
      }
    })
  }
}