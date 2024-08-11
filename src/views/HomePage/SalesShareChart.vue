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
interface EachSalesShareInter {
  name: string,
  value: number
}

type SalesShare = Array<EachSalesShareInter>

// 数据
let salesShare: SalesShare = []

// 方法
function pieOption(salesShare: SalesShare) {
  return {
    title: {
      text: '各品牌销量份额',
      top: '5%',
      left: 'center'
    },
    legend: {
      orient: 'horizontal',
      bottom: '5%',
      left: 'center'
    },
    tooltip: {
      trigger: "item",
    },
    color: [
      "#0f78f4",
      "#dd536b",
      "#9462e5",
      "#a6a6a6",
      "#e1bb22",
      "#39c362",
      "#3ed1cf",
    ],
    series: [
      {
        type: 'pie',
        radius: '60%',
        label: {
          show: false
        },
        data: salesShare
      }
    ],
  }
}

async function getSalesShareData() {
  const res = await api.getSalesShareData()
  return res.data
}

onMounted(async () => {
  const { proxy } = getCurrentInstance() as any

  Object.assign(salesShare, await getSalesShareData())

  ECharts.init(proxy.$refs.EChartsComponent).setOption(pieOption(salesShare))
})

</script>

<style lang="less" scoped>
.el-card {
  flex: 1;
}
</style>
