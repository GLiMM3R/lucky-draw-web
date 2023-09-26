import '@/assets/main.scss'
import 'vue-toast-notification/dist/theme-bootstrap.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { vuetify } from './plugins/vuetify'
import ToastPlugin from 'vue-toast-notification'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(ToastPlugin)

app.mount('#app')
