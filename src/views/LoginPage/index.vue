<script setup lang="ts">
import {reactive} from "vue"
import api from "@/api/api"
import {useAsideStore} from "@/store/aside"
import router from "@/router"

const loginForm = reactive({
  userName: 'admin',
  userPassword: 'admin'
})

async function loginUser() {
  const res = await api.getMenuList(loginForm.userName, loginForm.userPassword)
  const AsideStore = useAsideStore()

  sessionStorage.setItem('menuList', JSON.stringify(res.data.menu))

  AsideStore.updateMenuList()
  AsideStore.updateRouter()

  await router.push({name: 'home'})
}
</script>

<template>
  <el-form :model="loginForm"
           class="login-container"
           label-position="top">
    <h3>登录</h3>
    <el-form-item>
      <el-input type="text"
                placeholder="请输入账号"
                v-model="loginForm.userName"/>
    </el-form-item>
    <el-form-item>
      <el-input type="password"
                placeholder="请输入密码"
                v-model="loginForm.userPassword"/>
    </el-form-item>
    <el-button type="primary" @click="loginUser">登录</el-button>
  </el-form>
</template>

<style scoped lang="less">
.login-container {
  width: 300px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  border-radius: 15px;
  padding: 15px;
  box-shadow: 0 0 25px #cacaca;
  margin: 200px auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  h3 {
    margin-bottom: 20px;
  }

}
</style>