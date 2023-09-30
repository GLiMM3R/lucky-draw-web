import { couponStore } from '@/stores/coupon'
import request from '@/utils/request'
import { ref } from 'vue'
import { useToast } from 'vue-toast-notification'

export interface CreateCoupon {
  campaignId: string
  file: any
}

export default function useCoupon() {
  const $toast = useToast()
  const { state: couponState } = couponStore()
  const isLoading = ref(false)

  async function getCoupons(campaignId: string) {
    isLoading.value = true
    const { data, status } = await request({ url: `/coupons?${campaignId}` })

    if (status === 200) {
      couponState.coupons = data.data
      isLoading.value = false
    } else {
      isLoading.value = false
      $toast.error('Something went wrong')
    }
  }

  async function getCoupon(id: string) {
    isLoading.value = true
    const { data, status } = await request({ url: `/coupons/${id}` })

    if (status === 200) {
      isLoading.value = false
      couponState.coupon = data.data
    } else {
      isLoading.value = false
      $toast.error('Something went wrong')
    }
  }

  async function addCoupon(couponData: CreateCoupon) {
    isLoading.value = true

    const { data, status } = await request({
      url: '/coupons',
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: {
        campaignId: couponData.campaignId,
        file: couponData.file
      }
    })
    console.log('🚀 ~ file: useCoupon.ts:56 ~ addCoupon ~ data:', data)

    if (status === 201) {
      isLoading.value = false
    } else {
      isLoading.value = false
      $toast.error('Something went wrong')
    }
  }

  return { couponState, addCoupon, getCoupons, getCoupon, isLoading }
}
