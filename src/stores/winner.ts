import type { Prize } from '@/model/prize'
import type { Winner } from '@/model/winner'
import { defineStore } from 'pinia'
import request from '@/utils/request'
import { ref } from 'vue'
import { useToast } from 'vue-toast-notification'

export const useWinnerStore = defineStore('winner', () => {
  const $toast = useToast()

  const winners = ref<Winner[]>([])
  const prizes = ref<Prize[]>([])

  const isLoading = ref(false)

  async function getReport(slug: string) {
    isLoading.value = true
    try {
      const response = await request({ url: `/winner-record/report/${slug}` })

      winners.value = response.data.data
      isLoading.value = false
    } catch (error) {
      isLoading.value = false
      $toast.error('Something went wrong')
    }
  }
  return { winners, prizes, getReport }
})
