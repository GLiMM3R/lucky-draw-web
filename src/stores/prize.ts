import type { Prize } from '@/model/prize'
import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const prizeStore = defineStore('prize', () => {
  const state = reactive({
    prize: null as Prize | null,
    prizes: [] as Prize[]
  })

  return { state }
})
