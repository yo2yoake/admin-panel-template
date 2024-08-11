<template>
  <div class="">
    这里是More-1组件
  </div>
</template>

<script setup lang="ts">
import {onMounted} from "vue";
import {useAsideStore} from "@/store/aside"
import {storeToRefs} from "pinia";

const {activeIndex} = storeToRefs(useAsideStore());

onMounted(() => {
  activeIndex.value = '/more1'
})
</script>

<style lang="css" scoped></style>
