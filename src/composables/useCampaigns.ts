import type { Campaign } from '@/model/campaign'
import request from '@/utils/request'
import { reactive, ref } from 'vue'
import { useToast } from 'vue-toast-notification'

export interface CreateCampaign {
  title: string
  prizeCap: number
  type: string
}

export default function useCampaigns() {
  const campaigns = ref<Campaign[]>([])
  const $toast = useToast()
  const isLoading = ref(false)

  async function getCampaigns(type: string) {
    campaigns.value = []
    isLoading.value = true
    const { data, status } = await request({
      url: '/campaigns',
      params: {
        type,
        field: 'createdBy'
      }
    })

    if (status === 200) {
      campaigns.value = data.data
      isLoading.value = false
    } else {
      isLoading.value = false
      $toast.error('Something went wrong')
    }
  }

  return { campaigns, getCampaigns, isLoading }
}
