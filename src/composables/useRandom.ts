import type { Winner } from '@/model/winner'
import request from '@/utils/request'
import { ref } from 'vue'
import { useToast } from 'vue-toast-notification'

export interface RequestRandom {
  campaignId: string
  prizeId: string
}

export default function useRandom() {
  const winners = ref<Winner[]>([])
  const $toast = useToast()
  const isLoading = ref(false)

  async function randomDraw(randomData: RequestRandom) {
    isLoading.value = true
    const { data, status } = await request({ url: '/random', method: 'POST', data: randomData })

    if (status === 201) {
      isLoading.value = false
      winners.value = data.data
      return data.data
    } else {
      isLoading.value = false
      $toast.error('Something went wrong')
      return
    }
  }

  return { winners, randomDraw, isLoading }
}
