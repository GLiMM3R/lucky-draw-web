import { prizeStore } from '@/stores/prize'
import request from '@/utils/request'
import { ref } from 'vue'
import { useToast } from 'vue-toast-notification'

export interface CreatePrize {
  campaignId: string
  title: string
  amount: number
  rank: number
  file: any
}

export default function usePrize() {
  const $toast = useToast()
  const { state: prizeState } = prizeStore()
  const isLoading = ref(false)

  async function getPrizes(campaignId: string) {
    isLoading.value = true
    const { data, status } = await request({ url: `/prizes?${campaignId}` })

    console.log('🚀 ~ file: usePrize.ts:23 ~ getPrizes ~ data:', data)
    if (status === 200) {
      prizeState.prizes = data.data
      isLoading.value = false
    } else {
      isLoading.value = false
      $toast.error('Something went wrong')
    }
  }

  async function getPrize(id: string) {
    isLoading.value = true
    const { data, status } = await request({ url: `/prizes?${id}` })

    if (status === 200) {
      isLoading.value = false
    } else {
      isLoading.value = false
      $toast.error('Something went wrong')
    }
  }

  async function addPrize(prizeData: CreatePrize) {
    isLoading.value = true

    const { data, status } = await request({
      url: '/prizes',
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: {
        campaignId: prizeData.campaignId,
        title: prizeData.title,
        amount: prizeData.amount,
        rank: prizeData.rank,
        image: prizeData.file
      }
    })

    if (status === 201) {
      isLoading.value = false
    } else {
      isLoading.value = false
      $toast.error('Something went wrong')
    }
  }

  return { prizeState, addPrize, getPrize, getPrizes, isLoading }
}
