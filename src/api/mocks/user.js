import Mock from 'mockjs'

// 该部分实际上是模拟了后端的一些工作

// get请求从config.url获取参数，post从config.body中获取参数
function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"') +
    '"}'
  )
}

// 生成200条模拟数据
let List = []
const count = 200

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    userId: Mock.Random.guid(),
    userName: Mock.Random.cname(),
    userAddress: Mock.mock('@county(true)'),
    'userAge|18-60': 1,
    userBirth: Mock.Random.date(),
    userGender: Mock.Random.integer(0, 1)
  }))
}

/**
 * TODO: 使用TypeScript重构API
 */

export default {
  /**
   * 获取列表
   */
  getUserList: (config) => {
    const {keyWord, pageIndex = 1, pageSize = 20} = param2Obj(config.url)
    const mockList = List.filter(user => {
      return !(keyWord && user.userName.indexOf(keyWord) === -1 && user.userAddress.indexOf(keyWord) === -1);
    })
    const pageList = mockList.filter((item, index) => {
      return (index < pageSize * pageIndex) && (index >= pageSize * (pageIndex - 1))
    })
    return {
      code: 200,
      data: {
        list: pageList,
        count: mockList.length,
      }
    }
  },


  /**
   * 增加用户
   */
  createUser: (config) => {
    const {userName, userAge, userGender, userBirth, userAddress} = JSON.parse(config.body)
    List.unshift({
      userId: Mock.Random.guid(),
      userName,
      userAddress,
      userAge,
      userBirth,
      userGender
    })
    return {
      code: 200,
      data: {
        message: '添加成功'
      }
    }
  },


  /**
   * 删除用户
   */
  deleteUser: config => {
    const {userId} = JSON.parse(config.body)
    if (!userId) {
      return {
        code: -999,
        message: '参数不正确'
      }
    } else {
      List = List.filter((user) => user.userId !== userId)
      return {
        code: 200,
        message: '删除成功'
      }
    }
  },


  /**
   * 批量删除
   */
  batchremove: config => {
    let {ids} = param2Obj(config.url)
    ids = ids.split(',')
    List = List.filter(u => !ids.includes(u.id))
    return {
      code: 200,
      data: {
        message: '批量删除成功'
      }
    }
  },


  /**
   * 修改用户
   */
  updateUser: (config) => {
    const {userId, userName, userAddress, userAge, userBirth, userGender} = JSON.parse(config.body)
    List.some(user => {
      if (user.userId === userId) {
        user.userName = userName
        user.userAddress = userAddress
        user.userAge = userAge
        user.userBirth = userBirth
        user.userGender = userGender
        return true
      }
    })
    return {
      code: 200,
      data: {
        message: '编辑成功'
      }
    }
  }
}
