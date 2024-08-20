<template>
  <div class="common-layout">
    <el-container>
      <CommonAside/>
      <el-container>
        <el-header>
          <CommonHeader/>
        </el-header>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import CommonHeader from '@/components/CommenHeader.vue'
import CommonAside from '@/components/CommenAside.vue'
</script>

<style lang="less" scoped>
.common-layout {
  height: 100%;
  min-width: 625px;

  .el-container {
    height: 100%;

    .el-header {
      border-bottom: 1px solid #EBEEF5;
      display: flex;
    }

    .el-aside {
      height: 100%;
      background-color: #fff;
      border-right: 1px solid #EBEEF5;
    }
  }
}
</style>
