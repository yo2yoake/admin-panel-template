<template>
  <div class="order-cards">
    <el-card class="order-card" :body-style="{ display: 'flex', padding: 0 }" v-for="item in orderData" :key="item.name"
             shadow="hover">
      <component class="order-icon" :is="item.icon" :style="{ backgroundColor: item.color }"></component>
      <div class="order-info">
        <p class="order-value">{{ item.value }}</p>
        <p class="order-name">{{ item.name }}</p>
      </div>
    </el-card>
  </div>

</template>

<script setup lang="ts">
import {onMounted, reactive} from 'vue'
import api from '@/api/api'

interface OrderDataInter {
  name: '今日支付订单' | '今日收藏订单' | '今日未支付订单' | '本月支付订单' | '本月收藏订单' | '本月未支付订单' | 'Loading',
  value: number,
  icon: 'SuccessFilled' | 'StarFilled' | 'GoodsFilled',
  color: string
}

let orderData: Array<OrderDataInter> = reactive([
  {name: 'Loading', value: 0, icon: "SuccessFilled", color: "#2ec7c9"}
])

async function getOrderData() {
  const res = await api.getOrderData()
  return res.data
}

onMounted(async () => {
  Object.assign(orderData, await getOrderData())
})
</script>

<style lang="less" scoped>
.order-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .order-card {
    flex: 1 1 30%;
    margin-bottom: 20px;

    &:nth-child(3n+2) {
      margin-left: 20px;
      margin-right: 20px;
    }

    .order-icon {
      padding: 12px;
      width: 48px;
      height: 48px;
      color: #fff;
    }

    .order-info {
      margin-left: 12px;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .order-value {
        font-size: 32px;
        color: #000;
        margin-bottom: 4px;
      }

      .order-name {
        font-size: 12px;
        color: #999;
      }
    }
  }
}
</style>
