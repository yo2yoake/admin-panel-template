import Mock from 'mockjs'

// 该部分实际上是模拟了后端的一些工作

// 将URL的params参数处理成为JSON字符串,并进一步处理成为Object
function transParamsToObj(url) {
  const searchString = url.split('?')[1]
  if (!searchString) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(searchString)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"') +
    '"}'
  )
}

// 生成200条模拟数据
let impersonatedList = []
for (let i = 0; i < 200; i++) {
  impersonatedList.push(Mock.mock({
    userId: Mock.Random.guid(),
    userName: Mock.Random.cname(),
    userAddress: Mock.mock('@county(true)'),
    'userAge|18-60': 1,
    userBirth: Mock.Random.date(),
    userGender: Mock.Random.integer(0, 1)
  }))
}

export default {
  /**
   * 获取列表
   */
  getUserList: (config) => {
    const {keyWord, pageIndex = 1, pageSize = 20} = transParamsToObj(config.url)
    // 存放符合查询条件的数据
    const preparedList = impersonatedList.filter(user => {
      return !(keyWord && user.userName.indexOf(keyWord) === -1 && user.userAddress.indexOf(keyWord) === -1);
    })
    // 根据分页参数, 返回对应页面的数据给供页面渲染
    const pageRenderList = preparedList.filter((item, index) => {
      return (index < pageSize * pageIndex) && (index >= pageSize * (pageIndex - 1))
    })

    return {
      code: 200,
      data: {
        list: pageRenderList,
        count: preparedList.length,
      }
    }
  },

  /**
   * 增加用户
   */
  createUser: (config) => {
    const {userName, userAge, userGender, userBirth, userAddress} = JSON.parse(config.body)
    impersonatedList.unshift({
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
  deleteUser: (config) => {
    const {userId} = JSON.parse(config.body)
    if (!userId) {
      return {
        code: -999,
        message: '参数不正确'
      }
    } else {
      impersonatedList = impersonatedList.filter((user) => user.userId !== userId)
      return {
        code: 200,
        message: '删除成功'
      }
    }
  },

  /**
   * 修改用户
   */
  updateUser: (config) => {
    const {userId, userName, userAddress, userAge, userBirth, userGender} = JSON.parse(config.body)
    impersonatedList.forEach(user => {
      if (user.userId === userId) {
        user.userName = userName
        user.userAddress = userAddress
        user.userAge = userAge
        user.userBirth = userBirth
        user.userGender = userGender
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
