<script setup lang="ts">

import {useAsideStore} from "@/store/aside"
import {useRouter} from "vue-router"

useAsideStore().updateMenuList()
useAsideStore().updateRouter()



</script>

<template>
  <router-view/>
</template>

<style lang="less">
#app {
  height: 100%;
}
</style>
