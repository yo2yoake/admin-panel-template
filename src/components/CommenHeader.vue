<template>
  <div class="header">
    <!--  Header左侧功能区  -->
    <div class="l-content">
      <!--  侧边栏展开/折叠按钮  -->
      <el-button @click="useAsideStore().updateIsCollapse()">
        <el-icon :size="20">
          <Menu/>
        </el-icon>
      </el-button>
      <!--  面包屑  -->
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item>
          通用后台管理系统
        </el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: useHeaderStore().breadPath }" :replace="true">
          {{ useHeaderStore().breadLabel }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!--  Header右侧功能区  -->
    <div class="r-content">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img :src="getUserProfilePath('user')" alt=""/>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ArrowRight, Menu} from "@element-plus/icons-vue"
import {useAsideStore} from "@/store/aside"
import {useHeaderStore} from '@/store/header'

function getUserProfilePath(user: string): string {
  return new URL(`../assets/images/${user}.jpg`, import.meta.url).href
}

</script>

<style lang="less" scoped>
.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;


  .l-content {
    display: flex;
    align-items: center;

    .el-button {
      margin-right: 16px;
    }
  }

  .r-content {

    .el-dropdown {

      .el-dropdown-link {
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>
