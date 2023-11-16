import { defineStore } from 'pinia'
import { ref } from 'vue'
import request from '@/utils/request'
import { getRefreshToken, setAccessToken, setRefreshToken } from '@/utils/token'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toast-notification'

export const useUserStore = defineStore('user', () => {
  const router = useRouter()
  const isAuthenticate = ref(false)
  const $toast = useToast()
  const isLoading = ref(false)

  async function login(username: string, password: string) {
    isLoading.value = true
    try {
      const { data, status } = await request({
        url: '/auth/signin',
        method: 'POST',
        data: { username, password }
      })

      if (status == 201) {
        isAuthenticate.value = true
        setAccessToken(data.data.access_token)
        setRefreshToken(data.data.refresh_token)
        isLoading.value = false
        router.replace('/home')
      }
    } catch (error) {
      isLoading.value = false
      $toast.error('Username or password is not correct!')
    }
  }

  async function getUserProfile() {
    isLoading.value = true
    try {
      const { data, status } = await request({
        url: '/auth/me'
      })

      isLoading.value = false
      return data.data.username
    } catch (error) {
      isLoading.value = false
      $toast.error('Username or password is not correct!')
    }
  }

  return { login, getUserProfile, isAuthenticate, isLoading }
})
