<template>
  <el-card style="height: 240px;" :body-style="{ padding: 0 }" shadow="hover">
    <div ref="EChartsComponent" :style="{ height: '240px' }"></div>
  </el-card>
</template>

<script setup lang="ts">
import api from '@/api/api'
import { onMounted, getCurrentInstance } from 'vue'
import * as ECharts from 'echarts'

// 接口
interface DailyUserActivity {
  date: string,
  newUser: number,
  activeUser: number
}

interface UserActivitySeriesItem {
  name: '新增用户' | '活跃用户',
  data: Array<number>,
  type: 'bar'
}

// 数据
let userActivityData: Array<DailyUserActivity> = []

// 方法
function chartOption(xAxisData: Array<string>, series: Array<UserActivitySeriesItem>) {
  return {
    title: {
      text: '用户活跃',
      top: '5%',
      left: 'center'
    },
    legend: {
      orient: 'horizontal',
      bottom: '5%',
      left: 'center'
    },
    // 图例文字颜色
    textStyle: {
      color: "#333",
    },
    grid: {
      left: "20%",
    },
    // 提示框
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category", // 类目轴
      data: xAxisData,
      axisLine: {
        lineStyle: {
          color: "#17b3a3",
        },
      },
      axisLabel: {
        interval: 0,
        color: "#333",
      },
    },
    yAxis: [
      {
        type: "value",
        axisLine: {
          lineStyle: {
            color: "#17b3a3",
          },
        },
      },
    ],
    color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
    series: series
  }
}

async function getUserActivityData() {
  const res = await api.getUserActivityData()
  return res.data
}

onMounted(async () => {
  const { proxy } = getCurrentInstance() as any

  Object.assign(userActivityData, await getUserActivityData())

  let date: Array<string> = userActivityData.map((item) => item.date)

  let userActivitySeries: Array<UserActivitySeriesItem> = [
    {
      name: "新增用户",
      data: userActivityData.map((item) => item.newUser),
      type: "bar",
    },
    {
      name: "活跃用户",
      data: userActivityData.map((item) => item.activeUser),
      type: "bar",
    },
  ]

  ECharts.init(proxy.$refs.EChartsComponent).setOption(chartOption(date, userActivitySeries))
})

</script>

<style lang="less" scoped>
.el-card {
  flex: 1;
  margin-right: 20px;
}
</style>
