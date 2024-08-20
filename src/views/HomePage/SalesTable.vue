<template>
  <el-card shadow="hover" class="sales-card">
    <el-table :data="salesData">
      <el-table-column prop="name" label="品牌"></el-table-column>
      <el-table-column prop="todayBuy" label="今日销量"></el-table-column>
      <el-table-column prop="monthBuy" label="本月销量"></el-table-column>
      <el-table-column prop="totalBuy" label="总销量"></el-table-column>
    </el-table>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import api from '@/api/api'

interface SalesData {
  name: string,
  todayBuy: number,
  monthBuy: number,
  totalBuy: number
}

let salesData: Array<SalesData> = reactive([
  { name: 'Loading', todayBuy: 0, monthBuy: 0, totalBuy: 0, }
])

async function getSalesData() {
  const res = await api.getSalesData()
  return res.data
}


onMounted(async () => {
  Object.assign(salesData, await getSalesData())
})
</script>

<style lang="less" scoped></style>
