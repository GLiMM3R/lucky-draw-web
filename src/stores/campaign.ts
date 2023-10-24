import type { Campaign } from '@/model/campaign'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import request from '@/utils/request'
import { useToast } from 'vue-toast-notification'
import { useI18n } from 'vue-i18n'

export interface CreateCampaign {
  title: string
  prizeCap: number
  type: string
}

export interface UpdateCampaign {
  id: string
  title?: string
  prizeCap?: number
  isDone?: boolean
}

export const useCampaignStore = defineStore('campaign', () => {
  const $toast = useToast()
  const i18n = useI18n()

  const campaign = ref<Campaign | null>(null)
  const campaigns = ref<Campaign[]>([])
  const isLoading = ref(false)

  async function getCampaigns() {
    campaigns.value = []
    isLoading.value = true
    try {
      const response = await request({
        url: '/campaigns',
        params: {
          field: 'createdBy'
        }
      })

      campaigns.value = response.data.data
      isLoading.value = false
    } catch (error) {
      isLoading.value = false
      $toast.error('Something went wrong')
    }
  }

  async function getCampaign(id: string) {
    campaign.value = null
    isLoading.value = true
    try {
      const response = await request({
        url: `/campaigns/${id}`,
        params: {
          field: ['prizes', 'createdBy', 'coupons']
        }
      })

      campaign.value = response.data.data
      isLoading.value = false
    } catch (error) {
      isLoading.value = false
      $toast.error(i18n.t('alert.apiError'))
    }
  }

  async function getCampaignBySlug(slug: string) {
    campaign.value = null
    isLoading.value = true
    try {
      const response = await request({
        url: `/campaigns/slug/${slug}`,
        params: {
          field: ['prizes', 'createdBy', 'coupons']
        }
      })

      campaign.value = response.data.data
      isLoading.value = false
    } catch (error) {
      isLoading.value = false
      $toast.error(i18n.t('alert.apiError'))
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

      await getCampaigns()
      isLoading.value = false
    } catch (error) {
      isLoading.value = false
      $toast.error(i18n.t('alert.apiError'))
    }
  }

  async function updateCampaign(campaignData: UpdateCampaign) {
    isLoading.value = true
    try {
      await request({
        url: `/campaigns/${campaignData.id}`,
        method: 'PATCH',
        data: campaignData
      })

      await getCampaigns()
      isLoading.value = false
    } catch (error) {
      isLoading.value = false
      $toast.error(i18n.t('alert.apiError'))
    }
  }

  async function deleteCampaign(id: string) {
    isLoading.value = true
    try {
      await request({
        url: `/campaigns/${id}`,
        method: 'DELETE'
      })

      await getCampaigns()
      isLoading.value = false
    } catch (error) {
      isLoading.value = false
      $toast.error(i18n.t('alert.apiError'))
    }
  }

  async function uploadFileDataset(id: string, file: File, slug: string) {
    isLoading.value = true
    try {
      await request({
        url: `/campaigns/dataset/${id}`,
        method: 'PATCH',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: {
          file: file
        }
      })

      await getCampaignBySlug(slug)
      isLoading.value = false
    } catch (error) {
      isLoading.value = false
      $toast.error(i18n.t('alert.apiError'))
    }
  }

  async function validateCampaign(title: string) {
    campaign.value = null
    isLoading.value = true
    try {
      const response = await request({
        url: `/campaigns/validate`,
        params: {
          title
        }
      })

      isLoading.value = false
      return response.data.data
    } catch (error) {
      isLoading.value = false
      $toast.error(i18n.t('alert.apiError'))
    }
  }

  return {
    campaign,
    campaigns,
    addCampaign,
    getCampaign,
    getCampaignBySlug,
    getCampaigns,
    deleteCampaign,
    updateCampaign,
    uploadFileDataset,
    validateCampaign,
    isLoading
  }
})
