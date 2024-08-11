import Mock from 'mockjs'
import homeApi from './mocks/home'
import userApi from './mocks/user'

Mock.mock(/home\/getSalesData/, 'get', homeApi.getSalesData)
Mock.mock(/home\/getOrderData/, 'get', homeApi.getOrderData)
Mock.mock(/home\/getSalesTrendData/, 'get', homeApi.getSalesTrendData)
Mock.mock(/home\/getUserActivityData/, 'get', homeApi.getUserActivityData)
Mock.mock(/home\/getSalesShareData/, 'get', homeApi.getSalesShareData)

Mock.mock(/user\/getUserList/, 'get', userApi.getUserList)
