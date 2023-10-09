import { usePrizeStore } from '@/stores/prize'
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
export interface UpdatePrize {
  campaignId: string
  title: string
  amount: number
  rank: number
  file?: any
}

export default function usePrize() {
  const $toast = useToast()
  // const prize = ref<Prize | null>(null)
  // const prizes = ref<Prize[]>([])
  const prizeStore = usePrizeStore()
  const isLoading = ref(false)

  async function getPrizes(campaignId: string) {
    isLoading.value = true
    try {
      const response = await request({ url: `/prizes?${campaignId}` })

      prizeStore.prizes = response.data.data
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

      prizeStore.prize = response.data.data
      isLoading.value = false
    } catch (error) {
      isLoading.value = false
      $toast.error('Something went wrong')
    }
  }

  async function addPrize(prizeData: CreatePrize) {
    isLoading.value = true
    try {
      const response = await request({
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

      isLoading.value = false
    } catch (error) {
      isLoading.value = false
      $toast.error('Something went wrong')
    }
  }

  async function updatePrize(id: string, prizeData: UpdatePrize) {
    isLoading.value = true
    try {
      const response = await request({
        url: `/prizes/${id}`,
        method: 'PATCH',
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

      isLoading.value = false
    } catch (error) {
      isLoading.value = false
      $toast.error('Something went wrong')
    }
  }

  async function deletePrize(id: string) {
    isLoading.value = true
    try {
      const response = await request({ url: `/prizes/${id}`, method: 'DELETE' })

      isLoading.value = false
    } catch (error) {
      isLoading.value = false
      $toast.error('Something went wrong')
    }
  }

  return { addPrize, getPrize, getPrizes, updatePrize, deletePrize, isLoading }
}
