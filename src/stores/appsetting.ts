import { defineStore } from 'pinia'
import request from '@/utils/request'
import { ref } from 'vue'
import { useToast } from 'vue-toast-notification'

export interface RequestData {
  type: string
  image: any
}

export const useAppSettingStore = defineStore('appsetting', () => {
  const $toast = useToast()

  const isLoading = ref(false)

  async function getAppSetting() {
    isLoading.value = true
    try {
      const response = await request({
        url: '/appsetting'
      })

      isLoading.value = false
      return response.data.data
    } catch (error) {
      isLoading.value = false
      $toast.error('Something went wrong')
    }
  }

  async function updateAppSetting(requestData: RequestData) {
    isLoading.value = true
    try {
      const response = await request({
        url: '/appsetting',
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: {
          type: requestData.type,
          image: requestData.image
        }
      })

      isLoading.value = false
    } catch (error) {
      isLoading.value = false
      $toast.error('Something went wrong')
    }
  }

  const setLanguage = (language: string) => {
    localStorage.setItem('lang', language)
  }

  const getLanguage = () => {
    return localStorage.getItem('lang')
  }
  return { setLanguage, getLanguage, getAppSetting, updateAppSetting }
})
