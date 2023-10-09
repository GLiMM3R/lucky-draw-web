import type { Winner } from '@/model/winner'
import { useWinnerStore } from '@/stores/winner'
import request from '@/utils/request'
import { ref } from 'vue'
import { useToast } from 'vue-toast-notification'

export default function useWinner() {
  const $toast = useToast()
  // const winners = ref<Winner[]>([])
  const winnerStore = useWinnerStore()
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
    }
  }

  return { getWinnerRecord, isLoading }
}
