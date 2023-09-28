import request from '@/utils/request'
import { ref } from 'vue'
import { useToast } from 'vue-toast-notification'

export interface CreatePrize {
  campaignId: string
  title: string
  amount: number
  file: File
}

export default function usePrize() {
  const $toast = useToast()
  const isLoading = ref(false)

  async function getPrizes(campaignId: string) {
    isLoading.value = true
    const { data, status } = await request({ url: `/prizes/${campaignId}` })

    if (status === 200) {
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

    const formData = new FormData()
    formData.append('campaignId', prizeData.campaignId)
    formData.append('title', prizeData.title)
    formData.append('amount', prizeData.amount)
    formData.append('image', prizeData.file)

    const { data, status } = await request({
      url: '/prizes',
      method: 'POST',
      data: formData
    })

    if (status === 201) {
      isLoading.value = false
    } else {
      isLoading.value = false
      $toast.error('Something went wrong')
    }
  }

  return { addPrize, getPrize, getPrizes, isLoading }
}
