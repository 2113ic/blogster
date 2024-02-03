import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import '@/styles/index.scss'
import '@icxy/el-theme/base'

createApp(App)
  .use(router)
  .mount('#app')
