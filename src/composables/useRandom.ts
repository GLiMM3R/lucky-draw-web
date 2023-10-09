import type { Winner } from '@/model/winner'
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
    const { data, status } = await request({ url: `/winner-record/${campaignId}/${prizeId}` })

    if (status === 200) {
      winnerStore.winners = data.data
      isLoading.value = false
    } else {
      isLoading.value = false
      $toast.error('Something went wrong')
      return
    }
  }

  async function randomDraw(randomData: RequestRandom) {
    isLoading.value = true
    const { data, status } = await request({
      url: '/random/lucky-draw',
      method: 'POST',
      data: randomData
    })

    if (status === 201) {
      isLoading.value = false
      winnerStore.winners = data.data
    } else {
      isLoading.value = false
      $toast.error('Something went wrong')
      return
    }
  }

  async function wheelDraw(requestWheel: RequestWheel) {
    isLoading.value = true
    const { data, status } = await request({
      url: '/random/wheel-draw',
      method: 'POST',
      data: requestWheel
    })

    if (status === 201) {
      isLoading.value = false
    } else {
      isLoading.value = false
      $toast.error('Something went wrong')
      return
    }
  }

  return { getWinnerRecord, randomDraw, wheelDraw, isLoading }
}
