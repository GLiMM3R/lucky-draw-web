import type { Campaign } from '@/model/campaign'
import { useCampaignStore } from '@/stores/campaign'
import request from '@/utils/request'
import { ref } from 'vue'
import { useToast } from 'vue-toast-notification'

export interface CreateCampaign {
  title: string
  prizeCap: number
  type: string
}

export interface UpdateCampaign {
  id: string
  title: string
  prizeCap: number
}

export default function useCampaign() {
  // const campaign = ref<Campaign | null>(null)
  // const campaigns = ref<Campaign[]>([])

  const campaignStore = useCampaignStore()

  const $toast = useToast()
  const isLoading = ref(false)

  async function getCampaigns(type?: string) {
    campaignStore.campaigns = []
    isLoading.value = true
    try {
      const response = await request({
        url: '/campaigns',
        params: {
          type,
          field: 'createdBy'
        }
      })

      campaignStore.campaigns = response.data.data
      console.log(
        '🚀 ~ file: useCampaign.ts:41 ~ getCampaigns ~ campaignStore.campaigns:',
        campaignStore.campaigns
      )
      isLoading.value = false
    } catch (error) {
      isLoading.value = false
      $toast.error('Something went wrong')
    }
  }

  async function getCampaign(id: string) {
    // campaignStore.campaign = null
    isLoading.value = true
    try {
      const response = await request({
        url: `/campaigns/${id}`,
        params: {
          field: ['prizes', 'createdBy', 'coupons']
        }
      })

      campaignStore.campaign = response.data.data
      isLoading.value = false
    } catch (error) {
      isLoading.value = false
      $toast.error('Something went wrong')
    }
  }

  async function addCampaign(campaignData: CreateCampaign) {
    isLoading.value = true
    try {
      const response = await request({
        url: '/campaigns',
        method: 'POST',
        data: campaignData
      })

      isLoading.value = false
    } catch (error) {
      isLoading.value = false
      $toast.error('Something went wrong')
    }
  }

  async function updateCampaign(campaignData: UpdateCampaign) {
    isLoading.value = true
    try {
      const response = await request({
        url: `/campaigns/${campaignData.id}`,
        method: 'PATCH',
        data: campaignData
      })

      isLoading.value = false
    } catch (error) {
      isLoading.value = false
      $toast.error('Something went wrong')
    }
  }

  async function deleteCampaign(id: string) {
    isLoading.value = true
    try {
      const response = await request({
        url: `/campaigns/${id}`,
        method: 'DELETE'
      })

      isLoading.value = false
    } catch (error) {
      isLoading.value = false
      $toast.error('Something went wrong')
    }
  }

  async function uploadFileDataset(id: string, file: File) {
    isLoading.value = true
    try {
      const response = await request({
        url: `/campaigns/${id}`,
        method: 'PATCH',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: {
          file: file
        }
      })

      isLoading.value = false
    } catch (error) {
      isLoading.value = false
      $toast.error('Something went wrong')
    }
  }

  return {
    addCampaign,
    getCampaign,
    getCampaigns,
    deleteCampaign,
    updateCampaign,
    uploadFileDataset,
    isLoading
  }
}
