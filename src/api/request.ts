// Axios二次封装
import axios from 'axios'
import config from '@/config'
import {ElMessage} from 'element-plus'

const NETWORK_ERROR: string = '网络请求错误'

// 创建Axios实例对象
const service = axios.create({
  baseURL: config.baseApi
})

// 请求拦截器
service.interceptors.request.use((req) => {
  return req
})

// 响应拦截器
service.interceptors.response.use((res) => {
  const {status, data, statusText} = res
  if (status === 200) {
    return data
  } else {
    ElMessage.error(statusText || NETWORK_ERROR)
    return Promise.reject(statusText || NETWORK_ERROR)
  }
})

// Axios封装.该部分用于处理requestOption
interface RequestOptionInter {
  url: string,
  method: 'get' | 'post',
  isMock: boolean,
  data?: Object,
  params?: Object
}

function request(requestOption: RequestOptionInter) {
  // 从config文件中判断全局是否Mock
  let isMock: boolean = config.isMock
  // 从requestOption中判断请求该api时是否Mock：若未说明请求时是否mock，则以config为准；若说明了请求时是否mock，则以本次requestOption为准
  if (typeof requestOption.isMock !== 'undefined') {
    isMock = requestOption.isMock
  }

  // 处理线上环境：如果当前为生产环境，则使用baseApi；若为开发或测试环境，则依据config进行判断
  if (config.env === 'prod') {
    service.defaults.baseURL = config.baseApi
  } else {
    service.defaults.baseURL = isMock ? config.mockApi : config.baseApi
  }

  return service(requestOption)
}

export default request