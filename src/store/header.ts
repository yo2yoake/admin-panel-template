import {defineStore} from 'pinia';
import type {SimpleMenu, NestedMenu} from "@/types"
import {ref} from "vue";

let breadPath = ref('/')
let breadLabel = ref('首页')

export const useHeaderStore = defineStore('HeaderStore', () => {
  function updateBreadcrumb(item: NestedMenu | SimpleMenu) {
    breadPath.value = item.path
    breadLabel.value = item.label
  }

  return {
    breadPath,
    breadLabel,
    updateBreadcrumb
  }
})