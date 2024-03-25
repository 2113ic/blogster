import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { ElMessage } from 'element-plus'
import App from './App.vue'
import router from './router'

import 'element-plus/theme-chalk/dark/css-vars.css'
import 'element-plus/es/components/message/style/css'
import '@/styles/index.scss'
import '@et/index.scss'

const app = createApp(App)
const pinia = createPinia()

app.config.errorHandler = (err) => {
  if (err instanceof Error) {
    console.error(err)
    ElMessage({ message: err.message })
  }
}

app.use(pinia)
app.use(router)
app.mount('#app')
