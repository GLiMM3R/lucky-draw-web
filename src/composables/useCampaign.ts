import { campaignStore } from '@/stores/campaign'
import { couponStore } from '@/stores/coupon'
import { prizeStore } from '@/stores/prize'
import request from '@/utils/request'
import { ref } from 'vue'
import { useToast } from 'vue-toast-notification'

export interface CreateCampaign {
  title: string
  prizeCap: number
  campaignType: string
}

export default function useCampaign() {
  const { state: campaignState } = campaignStore()
  const { state: prizeState } = prizeStore()
  const { state: couponState } = couponStore()
  const $toast = useToast()
  const isLoading = ref(false)

  async function getCampaigns(type: string) {
    isLoading.value = true
    const { data, status } = await request({ url: `/campaigns?type=${type}` })

    if (status === 200) {
      campaignState.campaigns = data.data
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
      campaignState.campaign = data.data
      prizeState.prizes = data.data.prizes
      couponState.coupons = data.data.coupon
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

  return { campaignState, addCampaign, getCampaigns, getCampaign, isLoading }
}
