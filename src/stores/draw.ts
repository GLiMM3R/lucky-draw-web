import { defineStore } from 'pinia'
import request from '@/utils/request'
import { ref } from 'vue'
import { useToast } from 'vue-toast-notification'
import type { Winner } from '@/model/winner'
import { useCampaignStore } from '@/stores/campaign'

export interface RequestRandom {
  campaignSlug: string
  prizeId: string
}

interface RequestWheel {
  campaignSlug: string
  prizeId: string
  couponId: string
  winnerName: string
  winnerPhone: string
}

export const useDrawStore = defineStore('draw', () => {
  const campaignStore = useCampaignStore()
  const $toast = useToast()
  const winners = ref<Winner[]>([])

  const isLoading = ref(false)
  const errorMessage = ref('')

  async function getWinnerRecord(slug: string, prizeId: string) {
    isLoading.value = true
    try {
      const response = await request({ url: `/winner-record/${slug}/${prizeId}` })

      winners.value = response.data.data
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
      console.log('🚀 ~ file: draw.ts:51 ~ randomDraw ~ response:', response)

      if (response.response.status === 400) {
        errorMessage.value = response.response.data.message
        isLoading.value = false

        return
      }

      winners.value = response.data.data
      isLoading.value = false
    } catch (error) {
      isLoading.value = false
      $toast.error('Something went wrong')
    }
  }

  async function wheelDraw(requestWheel: RequestWheel) {
    isLoading.value = true
    try {
      await request({
        url: '/random/wheel-draw',
        method: 'POST',
        data: requestWheel
      })

      await campaignStore.getCampaign(requestWheel.campaignSlug)
      isLoading.value = false
    } catch (error) {
      isLoading.value = false
      $toast.error('Something went wrong')
    }
  }

  return { getWinnerRecord, randomDraw, wheelDraw, winners, isLoading, errorMessage }
})
