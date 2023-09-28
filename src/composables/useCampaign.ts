import { campaignStore } from '@/stores/campaign'
import request from '@/utils/request'
import { ref } from 'vue'
import { useToast } from 'vue-toast-notification'

export interface CreateCampaign {
  title: string
  prizeCap: number
  campaignType: string
}

export default function useCampaign() {
  const { state } = campaignStore()
  const $toast = useToast()
  const isLoading = ref(false)

  async function getCampaigns(type: string) {
    isLoading.value = true
    const { data, status } = await request({ url: `/campaigns?type=${type}` })

    if (status === 200) {
      state.campaigns = data.data
      isLoading.value = false
    } else {
      isLoading.value = false
      $toast.error('Something went wrong')
    }
  }

  async function getCampaign(id: string) {
    isLoading.value = true
    const { data, status } = await request({ url: `/campaigns/${id}` })

    if (status === 200) {
      state.campaign = data.data
      isLoading.value = false
    } else {
      isLoading.value = false
      $toast.error('Something went wrong')
    }
  }

  async function addCampaign(campaignData: CreateCampaign) {
    isLoading.value = true
    const { data, status } = await request({
      url: '/campaigns',
      method: 'POST',
      data: campaignData
    })

    if (status === 201) {
      isLoading.value = false
    } else {
      isLoading.value = false
      $toast.error('Something went wrong')
    }
  }

  return { state, addCampaign, getCampaigns, getCampaign, isLoading }
}
