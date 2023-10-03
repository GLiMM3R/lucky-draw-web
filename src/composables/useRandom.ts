import request from '@/utils/request'
import { ref } from 'vue'
import { useToast } from 'vue-toast-notification'

export interface RequestRandom {
  campaignId: string
  prizeId: string
}

export default function useRandom() {
  const $toast = useToast()
  const isLoading = ref(false)

  async function doRandom(randomData: RequestRandom) {
    isLoading.value = true
    const { data, status } = await request({ url: '/random', method: 'POST', data: randomData })
    console.log('🚀 ~ file: useRandom.ts:18 ~ doRandom ~ data:', data.data)

    if (status === 201) {
      isLoading.value = false
      return data.data
    } else {
      isLoading.value = false
      $toast.error('Something went wrong')
      return
    }
  }

  return { doRandom }
}
