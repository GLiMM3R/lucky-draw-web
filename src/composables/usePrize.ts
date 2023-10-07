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
    const { data, status } = await request({ url: `/prizes?${campaignId}` })

    if (status === 200) {
      prizeStore.prizes = data.data
      isLoading.value = false
    } else {
      isLoading.value = false
      $toast.error('Something went wrong')
    }
  }

  async function getPrize(id: string) {
    isLoading.value = true
    const { data, status } = await request({ url: `/prizes/${id}` })

    if (status === 200) {
      prizeStore.prize = data.data
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

  async function updatePrize(id: string, prizeData: UpdatePrize) {
    console.log('🚀 ~ file: usePrize.ts:81 ~ updatePrize ~ prizeData:', prizeData)
    isLoading.value = true

    const { data, status } = await request({
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

    if (status === 200) {
      isLoading.value = false
    } else {
      isLoading.value = false
      $toast.error('Something went wrong')
    }
  }

  async function deletePrize(id: string) {
    isLoading.value = true
    const { data, status } = await request({ url: `/prizes/${id}`, method: 'DELETE' })

    if (status === 200) {
      isLoading.value = false
    } else {
      isLoading.value = false
      $toast.error('Something went wrong')
    }
  }

  return { addPrize, getPrize, getPrizes, updatePrize, deletePrize, isLoading }
}
