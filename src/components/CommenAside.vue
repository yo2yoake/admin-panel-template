<template>
  <el-aside :width="isCollapse ? '65px' : '200px'">
    <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" :collapse="isCollapse"
             :collapse-transition="false">
      <el-menu-item v-for="item in getMenuWithoutChildren()" :index="item.path" :key="item.path"
                    @click="clickMenu(item)">
        <component class="icons" :is="item.icon"></component>
        <span>{{ item.label }}</span>
      </el-menu-item>
      <el-sub-menu v-for="item in getMenuWithChildren()" :index="item.label" :key="item.path">
        <template #title>
          <component class="icons" :is="item.icon"></component>
          <span>{{ item.label }}</span>
        </template>
        <el-menu-item-group title="Group One">
          <el-menu-item v-for="subItem in item.children" :index="subItem.path" :key="subItem.path"
                        @click="clickMenu(subItem)">
            <component class="icons" :is="subItem.icon"></component>
            <span>{{ subItem.label }}</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<script setup lang="ts">
import {useAsideStore} from "@/store/aside"
import {storeToRefs} from "pinia";

const AsideStore = useAsideStore()
const {isCollapse, activeIndex} = storeToRefs(AsideStore)
const {getMenuWithChildren, getMenuWithoutChildren, clickMenu} = AsideStore

</script>

<style lang="less" scoped>
.el-menu {
  border: 0;

  .icons {
    width: 16px;
    height: 16px;
  }

  span {
    margin-left: 8px;
  }
}
</style>
