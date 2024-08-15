<template>
  <!--  Header 工具组件-->
  <div class="user-tools">
    <el-button type="primary"
               icon="plus"
               @click="handleAdd"
    >新增
    </el-button>
    <el-input style="width: 240px"
              placeholder="搜索关键词"
              prefix-icon="Search"
              v-model="searchKey"
              @input="handleSearch"/>
    <el-dialog v-model="dialogState.isVisible"
               :title="dialogState.isEditing ? '编辑用户' : '新增用户'"
               @close="handleCloseDialog"
               width="500">
      <el-form>
        <el-form-item label="姓名">
          <el-input v-model="userInfoForm.userName"/>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input-number v-model="userInfoForm.userAge"
                           :min="0"
                           :max="200"/>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="userInfoForm.userGender">
            <el-radio :value="1">男</el-radio>
            <el-radio :value="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-date-picker v-model="userInfoForm.userBirth"
                          type="date"
                          placeholder="选择出生日期"
                          format="YYYY-MM-DD"
                          value-format="YYYY-MM-DD"/>
        </el-form-item>
        <el-form-item label="地址">
          <el-cascader
              size="large"
              :options="pcaTextArr"
              v-model="userAddressArray"
              placeholder="请选择省/市/区"
              @change="handleCascaderChange"
              :key="userInfoForm.userId">
          </el-cascader>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleConfirm">确定</el-button>
          <el-button @click="handleCloseDialog">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>


  <!--  Main 表格展示  -->
  <el-table :data="userList" style="width: 100%">
    <el-table-column prop="userName" label="姓名" width="90"/>
    <el-table-column prop="userAge" label="年龄" width="60"/>
    <el-table-column prop="userGender" label="性别" width="60" :formatter="genderFormatter"/>
    <el-table-column prop="userBirth" label="出生日期" width="120"/>
    <el-table-column prop="userAddress" label="地址" min-width="360"/>
    <el-table-column fixed="right" label="操作" width="240">
      <template #default="scope">
        <el-button type="primary"
                   size="small"
                   @click="handleEdit(scope.row)"
        >编辑
        </el-button>
        <el-button type="danger"
                   size="small"
                   @click="handleDelete(scope.row)"
        >删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>

  <!--  Footer 分页器  -->
  <el-pagination
      layout="prev, pager, next"
      :page-size="tablePageConfig.pageSize"
      :total="tablePageConfig.totalItems"
      @current-change="handleChangePage"
      style="justify-content: center"
  />
</template>

<script setup lang="ts">
import {onMounted, reactive, type Ref, ref, watch} from "vue";
import {useAsideStore} from "@/store/aside";
import {storeToRefs} from "pinia";
import api from "@/api/api";
import {pcaTextArr} from 'element-china-area-data'
import type {UserDataInter} from "@/types";

/**
 * 功能：获取展示用户列表并展示
 */
const userList: Ref<Array<UserDataInter>> = ref([
  {
    userId: "0",
    userName: "NoData",
    userAddress: "NoData",
    userAge: 0,
    userBirth: "1979-01-01",
    userGender: 0
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
  userList.value = await res.data.list
  tablePageConfig.totalItems = res.data.count
}

function genderFormatter(_: Object, __: Object, cellValue: 0 | 1) {
  return cellValue === 1 ? '男' : '女';
}

/**
 * 功能：表格页码切换
 */
async function handleChangePage(page: number) {
  tablePageConfig.pageIndex = page
  await getUserList(tablePageConfig)
}

/**
 * 功能：新增/编辑用户
 */
const dialogState: {
  isVisible: boolean,
  isEditing: boolean,
} = reactive({
  isVisible: false,
  isEditing: false,
})

const userInfoForm: UserDataInter = reactive({
  userId: '',
  userName: '',
  userAge: 0,
  userGender: 1,
  userBirth: '',
  userAddress: '',
})

function handleAdd() {
  dialogState.isVisible = true
  dialogState.isEditing = false
}

let userAddressArray: Array<string> = reactive(['', '', ''])

function handleEdit(user: UserDataInter) {
  dialogState.isVisible = true
  dialogState.isEditing = true
  userAddressArray = user.userAddress.split(' ')
  Object.assign(userInfoForm, user)
}

async function handleConfirm() {
  const res = await (dialogState.isEditing ? api.editUser(userInfoForm) : api.addUser(userInfoForm))
  if (res.code === 200) await getUserList(tablePageConfig)

  handleCloseDialog()
}

function handleCloseDialog() {
  dialogState.isVisible = false
  Object.assign(userAddressArray, ['', '', ''])
  Object.assign(userInfoForm, {
    userId: '',
    userName: '',
    userAge: 0,
    userGender: 1,
    userBirth: '',
    userAddress: '',
  })
}

function handleCascaderChange(arr: Array<string>) {
  userAddressArray = arr
  userInfoForm.userAddress = userAddressArray.join(' ')
}

/**
 * 功能：关键词搜索
 */
const searchKey: Ref<string> = ref('')

async function handleSearch() {
  const res = await api.searchUser(searchKey.value)
  userList.value = res.data.list
  tablePageConfig.totalItems = res.data.count
}

/**
 * 功能：删除用户
 */
async function handleDelete(user: UserDataInter) {
  await api.deleteUser(user.userId)
  await getUserList(tablePageConfig)
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

  // 功能：获取用户列表并展示
  await getUserList(tablePageConfig)
})


</script>

<style lang="less" scoped>

.user-tools {
  height: 32px;
  display: flex;
  align-items: center;
  padding-left: 8px;
  margin-bottom: 4px;

  .el-button {
    margin-right: 4px;
  }

  :deep(.el-input__inner) {
    height: 30px;
  }
}

.el-table {
  height: calc(100% - 32px - 32px - 5px);
}

</style>
