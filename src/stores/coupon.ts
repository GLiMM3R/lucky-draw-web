import type { Coupon } from '@/model/coupon'
import { defineStore } from 'pinia'
import request from '@/utils/request'
import { ref } from 'vue'
import { useToast } from 'vue-toast-notification'
import { useCampaignStore } from './campaign'

export interface CreateCoupon {
  campaignSlug: string
  name: string
  phone: string
}
export interface UpdateCoupon {
  name: string
  phone: string
}

export const useCouponStore = defineStore('coupon', () => {
  const campaignStore = useCampaignStore()
  const $toast = useToast()
  const coupon = ref<Coupon | null>(null)
  const coupons = ref<Coupon[]>([])
  const isLoading = ref(false)

  async function getCoupons(campaignId: string) {
    isLoading.value = true
    try {
      const response = await request({ url: `/coupons?${campaignId}` })
      coupons.value = response.data.data
      isLoading.value = false
    } catch (error) {
      isLoading.value = false
      $toast.error('Something went wrong')
    }
  }

  async function getCoupon(id: string) {
    isLoading.value = true
    try {
      const response = await request({ url: `/coupons/${id}` })

      coupon.value = response.data.data
      isLoading.value = false
    } catch (error) {
      isLoading.value = false
      $toast.error('Something went wrong')
    }
  }

  async function addCoupon(couponData: CreateCoupon) {
    isLoading.value = true
    try {
      const response = await request({
        url: '/coupons',
        method: 'POST',
        data: couponData
      })

      await campaignStore.getCampaignBySlug(couponData.campaignSlug)
      isLoading.value = false
    } catch (error) {
      isLoading.value = false
      $toast.error('Something went wrong')
    }
  }

  async function updateCoupon(id: string, slug: string, couponData: UpdateCoupon) {
    isLoading.value = true
    try {
      const response = await request({
        url: `/coupons/${id}`,
        method: 'PATCH',
        data: couponData
      })

      await campaignStore.getCampaignBySlug(slug)
      isLoading.value = false
    } catch (error) {
      isLoading.value = false
      $toast.error('Something went wrong')
    }
  }

  return { coupon, coupons, getCoupon, getCoupons, addCoupon, updateCoupon, isLoading }
})
