import type { Prize } from '@/model/prize'
import { defineStore } from 'pinia'
import request from '@/utils/request'
import { ref } from 'vue'
import { useToast } from 'vue-toast-notification'
import { useCampaignStore } from './campaign'

export interface CreatePrize {
  campaignSlug: string
  title: string
  amount: number
  rank: number
  file: any
}
export interface UpdatePrize {
  campaignSlug: string
  title: string
  amount: number
  rank: number
  file?: any
}

export const usePrizeStore = defineStore('prize', () => {
  const $toast = useToast()
  const campaignStore = useCampaignStore()

  const prize = ref<Prize | null>(null)
  const prizes = ref<Prize[]>([])

  const isLoading = ref(false)

  async function getPrizes(campaignId: string) {
    isLoading.value = true
    try {
      const response = await request({ url: `/prizes?${campaignId}` })

      prizes.value = response.data.data
      isLoading.value = false
    } catch (error) {
      isLoading.value = false
      $toast.error('Something went wrong')
    }
  }

  async function getPrize(id: string) {
    isLoading.value = true
    try {
      const response = await request({ url: `/prizes/${id}` })

      prize.value = response.data.data
      isLoading.value = false
    } catch (error) {
      isLoading.value = false
      $toast.error('Something went wrong')
    }
  }

  async function addPrize(prizeData: CreatePrize) {
    isLoading.value = true
    try {
      await request({
        url: '/prizes',
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: {
          campaignSlug: prizeData.campaignSlug,
          title: prizeData.title,
          amount: prizeData.amount,
          rank: prizeData.rank,
          image: prizeData.file
        }
      })

      await campaignStore.getCampaignBySlug(prizeData.campaignSlug)
      isLoading.value = false
    } catch (error) {
      isLoading.value = false
      $toast.error('Something went wrong')
    }
  }

  async function updatePrize(id: string, prizeData: UpdatePrize) {
    isLoading.value = true
    try {
      await request({
        url: `/prizes/${id}`,
        method: 'PATCH',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: {
          campaignSlug: prizeData.campaignSlug,
          title: prizeData.title,
          amount: prizeData.amount,
          rank: prizeData.rank,
          image: prizeData.file
        }
      })

      await campaignStore.getCampaignBySlug(prizeData.campaignSlug)
      isLoading.value = false
    } catch (error) {
      isLoading.value = false
      $toast.error('Something went wrong')
    }
  }

  async function deletePrize(id: string, slug: string) {
    isLoading.value = true
    try {
      await request({ url: `/prizes/${id}`, method: 'DELETE' })

      await campaignStore.getCampaignBySlug(slug)
      isLoading.value = false
    } catch (error) {
      isLoading.value = false
      $toast.error('Something went wrong')
    }
  }

  return { prize, prizes, addPrize, getPrize, getPrizes, updatePrize, deletePrize, isLoading }
})
