import Mock from 'mockjs'

export default {
  getSalesData: () => {
    return {
      code: 200,
      data: Mock.mock([
        {
          name: 'oppo',
          todayBuy: "@integer(500, 1000)",
          monthBuy: "@integer(2000, 10000)",
          totalBuy: "@integer(20000, 50000)"
        },
        {
          name: 'vivo',
          todayBuy: "@integer(500, 1000)",
          monthBuy: "@integer(2000, 10000)",
          totalBuy: "@integer(20000, 50000)"
        },
        {
          name: '苹果',
          todayBuy: "@integer(500, 1000)",
          monthBuy: "@integer(2000, 10000)",
          totalBuy: "@integer(20000, 50000)"
        },
        {
          name: '小米',
          todayBuy: "@integer(500, 1000)",
          monthBuy: "@integer(2000, 10000)",
          totalBuy: "@integer(20000, 50000)"
        },
        {
          name: '三星',
          todayBuy: "@integer(500, 1000)",
          monthBuy: "@integer(2000, 10000)",
          totalBuy: "@integer(20000, 50000)"
        },
        {
          name: '华为',
          todayBuy: "@integer(500, 1000)",
          monthBuy: "@integer(2000, 10000)",
          totalBuy: "@integer(20000, 50000)"
        }
      ])
    }
  },
  getOrderData: () => {
    return {
      code: 200,
      data: Mock.mock([
        {
          name: "今日支付订单",
          value: "@integer(2000, 5000)",
          icon: "SuccessFilled",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: "@integer(500, 1500)",
          icon: "StarFilled",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: "@integer(200, 500)",
          icon: "GoodsFilled",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: "@integer(50000, 100000)",
          icon: "SuccessFilled",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: "@integer(5000, 15000)",
          icon: "StarFilled",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: "@integer(500, 1500)",
          icon: "GoodsFilled",
          color: "#5ab1ef",
        },
      ])
    }
  },
  getSalesTrendData: () => {
    return {
      code: 200,
      data: Mock.mock({
        "date": ['20191001', '20191002', '20191003', '20191004', '20191005', '20191006', '20191007'],
        "salesData|7": [
          {
            "苹果": "@integer(1000, 5000)",
            "小米": "@integer(1000, 5000)",
            "华为": "@integer(1000, 5000)",
            "oppo": "@integer(1000, 5000)",
            "vivo": "@integer(1000, 5000)",
            "三星": "@integer(1000, 5000)",
          }
        ]
      })
    }
  },
  getUserActivityData: () => {
    return {
      code: 200,
      data: Mock.mock(
        [
          {
            date: '周一',
            newUser: "@integer(10, 200)",
            activeUser: "@integer(500, 1000)"
          },
          {
            date: '周二',
            newUser: "@integer(10, 200)",
            activeUser: "@integer(500, 1000)"
          },
          {
            date: '周三',
            newUser: "@integer(10, 200)",
            activeUser: "@integer(500, 1000)"
          },
          {
            date: '周四',
            newUser: "@integer(10, 200)",
            activeUser: "@integer(500, 1000)"
          },
          {
            date: '周五',
            newUser: "@integer(10, 200)",
            activeUser: "@integer(500, 1000)"
          },
        ]
      )
    }
  },
  getSalesShareData: () => {
    return {
      code: 200,
      data: Mock.mock(
        [
          {
            name: '小米',
            value: "@integer(1000, 5000)"
          },
          {
            name: '苹果',
            value: "@integer(1000, 5000)"
          },
          {
            name: 'vivo',
            value: "@integer(1000, 5000)"
          },
          {
            name: 'oppo',
            value: "@integer(1000, 5000)"
          },
          {
            name: '华为',
            value: "@integer(1000, 5000)"
          },
          {
            name: '三星',
            value: "@integer(1000, 5000)"
          }
        ]
      )
    }
  }
}