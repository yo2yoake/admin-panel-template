// 环境配置文件

// 定义接口
interface ApiInter {
  baseApi: string,
  mockApi: string
}

interface EnvConfigInter {
  development: ApiInter,
  test: ApiInter,
  prod: ApiInter
}

// 定义配置
const env: 'development' | 'test' | 'prod' = (import.meta.env.MODE as ('development' | 'test' | 'prod')) || 'prod'

const EnvConfig: EnvConfigInter = {
  development: {
    baseApi: '',
    mockApi: '/api'
  },
  test: {
    baseApi: '',
    mockApi: '/api'
  },
  prod: {
    baseApi: '',
    mockApi: '/api'
  }
}

export default {
  env,
  isMock: true,
  ...EnvConfig[env]
}