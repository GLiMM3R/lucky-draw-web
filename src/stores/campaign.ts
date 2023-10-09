// import type { Campaign } from '@/model/campaign'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCampaignStore = defineStore('campaign', () => {
  const campaign = ref<Campaign | null>(null)
  const campaigns = ref<Campaign[]>([])

  return { campaign, campaigns }
})
