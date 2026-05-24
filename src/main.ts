import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import App from './App.vue'
import router from './router'

import 'element-plus/dist/index.css'
import 'normalize.css/normalize.css'
import '@/styles/index.scss'

const app = createApp(App)

app.use(ElementPlus)
app.use(router)
app.mount('#app')