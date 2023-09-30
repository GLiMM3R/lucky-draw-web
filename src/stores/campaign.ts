import type { Campaign } from '@/model/campaign'
import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const campaignStore = defineStore('campaign', () => {
  const state = reactive({
    campaign: null as Campaign | null,
    campaigns: [] as Campaign[]
  })

  return { state }
})
