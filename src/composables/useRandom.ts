import { useWinnerStore } from '@/stores/winner'
import request from '@/utils/request'
import { ref } from 'vue'
import { useToast } from 'vue-toast-notification'

export interface RequestRandom {
  campaignId: string
  prizeId: string
}

interface RequestWheel {
  campaignId: string
  prizeId: string
  couponId: string
  winnerName: string
  winnerPhone: string
}

export default function useRandom() {
  const winnerStore = useWinnerStore()

  const $toast = useToast()
  const isLoading = ref(false)

  async function getWinnerRecord(campaignId: string, prizeId: string) {
    isLoading.value = true
    try {
      const response = await request({ url: `/winner-record/${campaignId}/${prizeId}` })

      winnerStore.winners = response.data.data
      isLoading.value = false
    } catch (error) {
      isLoading.value = false
      $toast.error('Something went wrong')
      return
    }
  }

  async function randomDraw(randomData: RequestRandom) {
    isLoading.value = true
    try {
      const response = await request({
        url: '/random/lucky-draw',
        method: 'POST',
        data: randomData
      })

      winnerStore.winners = response.data.data
      isLoading.value = false
    } catch (error) {
      isLoading.value = false
      $toast.error('Something went wrong')
    }
  }

  async function wheelDraw(requestWheel: RequestWheel) {
    isLoading.value = true
    try {
      const response = await request({
        url: '/random/wheel-draw',
        method: 'POST',
        data: requestWheel
      })

      isLoading.value = false
    } catch (error) {
      isLoading.value = false
      $toast.error('Something went wrong')
    }
  }

  return { getWinnerRecord, randomDraw, wheelDraw, isLoading }
}
