<template>
  <el-card style="height: 240px;" :body-style="{ padding: 0 }" shadow="hover">
    <div ref="EChartsComponent" :style="{ height: '240px' }"></div>
  </el-card>
</template>

<script setup lang="ts">
import {getCurrentInstance, onMounted} from "vue"
import * as ECharts from 'echarts'
import api from "@/api/api"

// 类型
interface SalesTrendItemInter {
  "Apple": number,
  "Xiaomi": number,
  "HUAWEI": number,
  "OPPO": number,
  "vivo": number,
  "Sumsang": number
}

interface SalesTrendDataInter {
  date: Array<string>
  salesData: Array<SalesTrendItemInter>
}

interface SalesDataSeriesItem {
  name: string,
  data: Array<number>,
  type: 'line',
}

// 定义数据
let salesTrendData: SalesTrendDataInter = {
  date: [],
  salesData: []
}

// 定义方法
function handleSalesData(salesTrendData: SalesTrendDataInter): Array<SalesDataSeriesItem> {
  let salesDataSeries: Array<SalesDataSeriesItem> = []
  Object.keys(salesTrendData.salesData[0]).forEach((key) => {
    salesDataSeries.push({
      userName: key,
      data: salesTrendData.salesData.map((item) => item[key as (keyof SalesTrendItemInter)]),
      type: "line",
    })
  })
  return salesDataSeries
}

function chartOption(xAxisData: Array<string>, series: Array<SalesDataSeriesItem>) {
  return {
    title: {
      text: '各品牌销量趋势',
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
      confine: true
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

async function getSalesTrendData() {
  const res = await api.getSalesTrendData()
  return res.data
}

onMounted(async () => {
  const {proxy} = getCurrentInstance() as any

  Object.assign(salesTrendData, await getSalesTrendData())


  let salesDate: Array<string> = salesTrendData.date
  let salesDataSeries: Array<SalesDataSeriesItem> = handleSalesData(salesTrendData)

  ECharts.init(proxy.$refs.EChartsComponent).setOption(chartOption(salesDate, salesDataSeries))
})

</script>

<style lang="less" scoped>
.el-card {
  margin-bottom: 20px;
}
</style>