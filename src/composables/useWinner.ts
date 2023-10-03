import type { Winner } from '@/model/winner'
import request from '@/utils/request'
import { ref } from 'vue'
import { useToast } from 'vue-toast-notification'

export default function useWinner() {
  const $toast = useToast()
  const winners = ref<Winner[]>([])
  const isLoading = ref(false)

  async function getWinnerRecord(campaignId: string, prizeId: string) {
    isLoading.value = true
    const { data, status } = await request({ url: `/winner-record/${campaignId}/${prizeId}` })

    if (status === 200) {
      isLoading.value = false
      winners.value = data.data
    } else {
      isLoading.value = false
      $toast.error('Something went wrong')
      return
    }
  }

  return { winners, getWinnerRecord, isLoading }
}
