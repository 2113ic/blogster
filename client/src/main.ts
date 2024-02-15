import { createApp } from 'vue'
import router from './router'
import App from './App.vue'

import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/styles/index.scss'

createApp(App)
  .use(router)
  .mount('#app')
