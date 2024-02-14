import { createApp } from 'vue'
import router from './router'
import App from './App.vue'

import '@/styles/index.scss'
import 'element-plus/theme-chalk/dark/css-vars.css'

createApp(App)
  .use(router)
  .mount('#app')
