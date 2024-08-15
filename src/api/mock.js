import Mock from 'mockjs'
import homeApi from './mocks/home'
import userApi from './mocks/user.js'

Mock.mock(/home\/getSalesData/, 'get', homeApi.getSalesData)
Mock.mock(/home\/getOrderData/, 'get', homeApi.getOrderData)
Mock.mock(/home\/getSalesTrendData/, 'get', homeApi.getSalesTrendData)
Mock.mock(/home\/getUserActivityData/, 'get', homeApi.getUserActivityData)
Mock.mock(/home\/getSalesShareData/, 'get', homeApi.getSalesShareData)

Mock.mock(/user\/getUserList/, 'get', userApi.getUserList)
Mock.mock(/user\/createUser/, 'post', userApi.createUser)
Mock.mock(/user\/updateUser/, 'post', userApi.updateUser)
Mock.mock(/user\/deleteUser/, 'post', userApi.deleteUser)
