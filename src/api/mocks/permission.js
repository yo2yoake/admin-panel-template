import Mock from 'mockjs'
export default {
  getMenuList: (config) => {
    const { userName, userPassword } = JSON.parse(config.body)
    // 先判断用户是否存在
    // 判断账号和密码是否对应
    if (userName === 'admin' && userPassword === 'admin') {
      console.log('Admin已登录')
      return {
        code: 200,
        data: {
          menu: [
            {
              path: '/home',
              name: 'home',
              label: '首页',
              icon: 'house',
              url: 'HomePage/Index'
            },
            {
              path: '/user',
              name: 'user',
              label: '用户管理',
              icon: 'user',
              url: 'UserManagement/Index'
            },
            {
              label: '其他',
              icon: 'location',
              children: [
                {
                  path: '/more1',
                  name: 'more1',
                  label: '页面1',
                  icon: 'setting',
                  url: 'MoreMenu/More1'
                },
                {
                  path: '/more2',
                  name: 'more2',
                  label: '页面2',
                  icon: 'setting',
                  url: 'MoreMenu/More2'
                }
              ]
            }
          ],
          token: Mock.Random.guid(),
          message: '获取成功'
        }
      }
    } else if (userName === 'xiaoxiao' && userPassword === 'xiaoxiao') {
      console.log('xiaoxiao已登录')
      return {
        code: 200,
        data: {
          menu: [
            {
              path: '/home',
              name: 'home',
              label: '首页',
              icon: 'house',
              url: 'HomePage/Index'
            }
          ],
          token: Mock.Random.guid(),
          message: '获取成功'
        }
      }
    } else {
      return {
        code: -999,
        data: {
          message: '密码错误'
        }
      }
    }

  }
}