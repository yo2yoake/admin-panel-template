<template>
  <el-table :data="userList" style="width: 100%">
    <el-table-column prop="name" label="姓名" width="120"/>
    <el-table-column prop="age" label="年龄" width="120"/>
    <el-table-column prop="gender" label="性别" width="120"/>
    <el-table-column prop="birth" label="出生日期" width="240"/>
    <el-table-column prop="addr" label="地址" min-width="360"/>
    <el-table-column fixed="right" label="操作" width="240">
      <template #default>
        <el-button type="primary" size="small">编辑</el-button>
        <el-button type="danger" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
      layout="prev, pager, next"
      :page-size="tablePageConfig.pageSize"
      :total="tablePageConfig.totalItems"
      @current-change="handleChangePage"
      style="justify-content: center"
  />
</template>

<script setup lang="ts">
import {onMounted, reactive} from "vue";
import {useAsideStore} from "@/store/aside";
import {storeToRefs} from "pinia";
import api from "@/api/api";

/**
 * 功能：展示用户列表
 */
interface UserDataInter {
  id: string,
  name: string,
  addr: string,
  age: number,
  birth: string,
  gender: 0 | 1 | '男' | '女'
}

const userList: Array<UserDataInter> = reactive([
  {
    id: "0",
    name: "NoData",
    addr: "NoData",
    age: 0,
    birth: "1979-01-01",
    gender: 0
  }
])

interface TablePageConfigInter {
  totalItems: number;
  pageIndex: number;
  pageSize: number;
}

const tablePageConfig: TablePageConfigInter = reactive({
  totalItems: 0,
  pageIndex: 1,
  pageSize: 20,
})

async function getUserList(config: TablePageConfigInter) {
  const res = await api.getUserList(config.pageIndex, config.pageSize);
  tablePageConfig.totalItems = res.data.count
  return res.data.list.map((item: UserDataInter) => {
    item.gender = item.gender ? '男' : '女'
    return item
  })
}

/**
 * 功能：表格页码切换
 */
async function handleChangePage(page: number) {
  tablePageConfig.pageIndex = page
  Object.assign(userList, await getUserList(tablePageConfig))
}


/**
 * 功能：侧边栏菜单动态Active
 */
const {activeIndex} = storeToRefs(useAsideStore())


/**
 * HOOK：页面挂载完成时
 */
onMounted(async () => {
  // 功能：侧边栏菜单动态Active
  activeIndex.value = '/UserManagement'

  // 功能：展示用户列表
  Object.assign(userList, await getUserList(tablePageConfig))
})


</script>

<style lang="less" scoped></style>
