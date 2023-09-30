import type { Coupon } from '@/model/coupon'
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const couponStore = defineStore('prize', () => {
  const state = reactive({
    coupon: null as Coupon | null,
    coupons: [] as Coupon[]
  })

  return { state }
})
