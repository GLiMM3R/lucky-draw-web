import type { Coupon } from '@/model/coupon'
import request from '@/utils/request'
import { ref } from 'vue'
import { useToast } from 'vue-toast-notification'

export interface CreateCoupon {
  campaignId: string
  name: string
  phone: string
}
export interface UpdateCoupon {
  campaignId: string
  name: string
  phone: string
}

export default function useCoupon() {
  const $toast = useToast()
  const coupon = ref<Coupon | null>(null)
  const coupons = ref<Coupon[]>([])
  const isLoading = ref(false)

  async function getCoupons(campaignId: string) {
    isLoading.value = true
    const { data, status } = await request({ url: `/coupons?${campaignId}` })

    if (status === 200) {
      coupons.value = data.data
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
      coupon.value = data.data
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
      data: couponData
    })

    if (status === 201) {
      isLoading.value = false
    } else {
      isLoading.value = false
      $toast.error('Something went wrong')
    }
  }

  async function updateCoupon(id: string, couponData: UpdateCoupon) {
    isLoading.value = true

    const { data, status } = await request({
      url: `/coupons/${id}`,
      method: 'PATCH',
      data: couponData
    })

    if (status === 200) {
      isLoading.value = false
    } else {
      isLoading.value = false
      $toast.error('Something went wrong')
    }
  }

  return { coupon, coupons, addCoupon, getCoupons, getCoupon, updateCoupon, isLoading }
}
