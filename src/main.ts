import {createApp} from 'vue'
import App from './App.vue'
import router from '@/router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import '@/assets/less/index.less'
import {createPinia} from 'pinia'
import '@/api/mock.js'
import {useAsideStore} from "@/store/aside";

const app = createApp(App)

// 配置Element-Plus
app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 配置Pinia
app.use(createPinia())

// 配置路由
app.use(router)


// 挂载组件
app.mount('#app')