<template>

  <!--  TODO: 首页响应式布局  -->

  <el-row class="home" :gutter="20">
    <!-- 左侧 -->
    <el-col :span="8">
      <!-- 用户卡片模块 -->
      <UserCard/>
      <!-- 销量表格模块 -->
      <SalesTable/>
    </el-col>

    <!-- 右侧 -->
    <el-col :span="16">
      <OrderCards/>
      <SalesTrendChart/>
      <template style="display: flex;">
        <UserActivityChart/>
        <SalesShareChart/>
      </template>

    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import UserCard from '@/views/HomePage/UserCard.vue'
import SalesTable from '@/views/HomePage/SalesTable.vue'
import OrderCards from '@/views/HomePage/OrderCards.vue'
import SalesTrendChart from '@/views/HomePage/SalesTrendChart.vue'
import UserActivityChart from '@/views/HomePage/UserActivityChart.vue'
import SalesShareChart from '@/views/HomePage/SalesShareChart.vue'
import {onMounted} from "vue";
import {useAsideStore} from "@/store/aside";
import {storeToRefs} from "pinia";

const {activeIndex} = storeToRefs(useAsideStore());

onMounted(() => {
  activeIndex.value = '/'
})

</script>

<style lang="less" scoped>

</style>
