import type { Prize } from '@/model/prize'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePrizeStore = defineStore('prize', () => {
  const prize = ref<Prize | null>(null)
  const prizes = ref<Prize[]>([])

  return { prize, prizes }
})
