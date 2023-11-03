import { defineStore } from 'pinia'
import request from '@/utils/request'
import { ref } from 'vue'
import { useToast } from 'vue-toast-notification'

export const useAppSettingStore = defineStore('appsetting', () => {
  const $toast = useToast()

  const isLoading = ref(false)

  const setLanguage = (language: string) => {
    localStorage.setItem('lang', language)
  }

  const getLanguage = () => {
    return localStorage.getItem('lang')
  }
  return { setLanguage, getLanguage }
})
