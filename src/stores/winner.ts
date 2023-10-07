import type { Winner } from '@/model/winner'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useWinnerStore = defineStore('winner', () => {
  const winners = ref<Winner[]>([])

  return { winners }
})
