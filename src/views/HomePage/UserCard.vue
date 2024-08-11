<template>
  <el-card shadow="hover" class="user-card">
    <div class="user-info">
      <img class="user-profile" src="../../assets/images/user.jpg" alt="User Profile" />
      <div class="user-text">
        <p class="user-name">Admin</p>
        <p class="user-role">管理员</p>
      </div>
    </div>
    <div class="login-info">
      <p class="login-time">登录时间：<span>2077-12-31 23:59:59</span></p>
      <p class="login-address">登录地点：<span>北京</span></p>
    </div>
  </el-card>
</template>

<script setup lang="ts">
</script>

<style lang="less" scoped>
.user-card {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  .user-info {
    display: flex;
    width: 100%;
    align-items: center;
    border-bottom: 1px solid #E4E7ED;
    padding-bottom: 20px;
    margin-bottom: 20px;

    .user-profile {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      margin-right: 20px;
    }

    .user-name {
      font-size: 36px;
      line-height: 54px;
    }

    .user-role {
      font-size: 16px;
    }
  }

  .login-info {
    p {
      line-height: 24px;
      font-size: 12px;
      color: #999;

      span {
        color: #666;
      }
    }
  }
}
</style>
