import { createApp } from 'vue'
import router from '@/router/index.js'
import pinia from '@/stores/index.js'

import App from './App.vue'
import '@/assets/main.scss'

const app = createApp(App)

app.use(router)
app.use(pinia)

app.mount('#app')
