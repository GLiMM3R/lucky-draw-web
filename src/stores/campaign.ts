import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const campaignStore = defineStore('campaign', () => {
  const state = reactive({
    campaign: {
      id: '',
      title: '',
      prizeCap: 0,
      campaignType: '',
      createdBy: [],
      isActive: true,
      createdAt: '',
      updatedAt: '',
      prizes: [],
      coupons: []
    },
    campaigns: []
  })

  return { state }
})
