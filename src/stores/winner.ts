import type { Winner } from '@/model/winner'
import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const winnerStore = defineStore('winner', () => {
  const state = reactive({
    winner: null as Winner | null,
    winners: [] as Winner[]
  })

  return { state }
})
