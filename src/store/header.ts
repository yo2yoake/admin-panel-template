import {defineStore} from 'pinia';
import type {MenuWithoutChildrenInter, MenuWithChildrenInter} from "@/types"
import {ref} from "vue";

let breadPath = ref('/')
let breadLabel = ref('首页')

export const useHeaderStore = defineStore('HeaderStore', () => {
  function updateBreadcrumb(item: MenuWithChildrenInter | MenuWithoutChildrenInter) {
    breadPath.value = item.path
    breadLabel.value = item.label
  }

  return {
    breadPath,
    breadLabel,
    updateBreadcrumb
  }
})