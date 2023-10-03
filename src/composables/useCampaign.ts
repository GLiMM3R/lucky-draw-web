import type { Campaign } from '@/model/campaign'
import { prizeStore } from '@/stores/prize'
import request from '@/utils/request'
import { reactive, ref } from 'vue'
import { useToast } from 'vue-toast-notification'
import useCampaigns from './useCampaigns'

export interface CreateCampaign {
  title: string
  prizeCap: number
  type: string
}

export default function useCampaign() {
  const campaign = ref<Campaign | null>(null)

  const { campaigns, getCampaigns } = useCampaigns()
  const $toast = useToast()
  const isLoading = ref(false)

  async function getCampaign(id: string) {
    campaign.value = null
    isLoading.value = true
    const { data, status } = await request({
      url: `/campaigns/${id}`,
      params: {
        field: ['prizes', 'createdBy']
      }
    })
    if (status === 200) {
      campaign.value = data.data
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
      await getCampaigns('random')
      console.log('🚀 ~ file: useCampaign.ts:18 ~ useCampaign ~ campaigns:', campaigns.value)

      isLoading.value = false
    } else {
      isLoading.value = false
      $toast.error('Something went wrong')
    }
  }

  async function uploadFileDataset(id: string, file: File) {
    isLoading.value = true

    const { data, status } = await request({
      url: `/campaigns/${id}`,
      method: 'PATCH',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: {
        file: file
      }
    })

    if (status === 200) {
      await getCampaign(id)
      isLoading.value = false
    } else {
      isLoading.value = false
      $toast.error('Something went wrong')
    }
  }

  return { campaign, addCampaign, getCampaign, uploadFileDataset, isLoading }
}
