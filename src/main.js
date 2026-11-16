import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import errorHandler from '@/utils/errorHandler'
import { setupLazyLoad } from '@/directives/lazyLoad'
import '@/assets/styles/index.less'

const app = createApp(App)
const pinia = createPinia()

// Pinia 持久化插件
pinia.use(piniaPluginPersistedstate)

// 全局错误处理
app.use(errorHandler)

// 图片懒加载指令
setupLazyLoad(app)

// 使用 Pinia 和路由
app.use(pinia)
app.use(router)

// 全局属性 - 环境信息
app.config.globalProperties.$env = import.meta.env

// 挂载应用
app.mount('#app')

// 开发环境下暴露全局变量便于调试
if (import.meta.env.DEV) {
  window.__APP__ = app
  window.__PINIA__ = pinia
}
