import { winnerStore } from '@/stores/winner'
import request from '@/utils/request'
import { ref } from 'vue'
import { useToast } from 'vue-toast-notification'

export default function useWinner() {
  const $toast = useToast()
  const { state: winnerState } = winnerStore()
  const isLoading = ref(false)

  async function getWinnerRecord(campaignId: string, prizeId: string) {
    isLoading.value = true
    const { data, status } = await request({ url: `/winner-record/${campaignId}/${prizeId}` })

    if (status === 200) {
      isLoading.value = false
      winnerState.winners = data.data
    } else {
      isLoading.value = false
      $toast.error('Something went wrong')
      return
    }
  }

  return { winnerState, getWinnerRecord, isLoading }
}
