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
type Env = 'development' | 'test' | 'prod'
const env: Env = (import.meta.env.MODE as Env) || 'prod'

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