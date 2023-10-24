import '@/assets/main.scss'
import 'vue-toast-notification/dist/theme-bootstrap.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { createI18n } from 'vue-i18n'
import { vuetify } from './plugins/vuetify'
import ToastPlugin from 'vue-toast-notification'
import { defaultLocale, messages } from '@/i18n/index'
import { useAppSettingStore } from './stores/appsetting'

const app = createApp(App)
app.use(createPinia())

const { getLanguage } = useAppSettingStore()

const i18n = createI18n({
  legacy: false,
  locale: getLanguage()?.toString() ?? defaultLocale,
  fallbackLocale: 'en',
  messages
})

app.use(router)
app.use(vuetify)
app.use(i18n)
app.use(ToastPlugin)

app.mount('#app')
