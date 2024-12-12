import { defineStore } from 'pinia'
import request from '@/utils/request'
import { ref } from 'vue'
import { useToast } from 'vue-toast-notification'
import type {
  CreateDrawPrize,
  DrawPrize,
  DrawPrizeWithWinner,
  UpdateDrawPrize
} from './types/drawPrize'

export const useDrawPrizeStore = defineStore('drawPrize', () => {
  const $toast = useToast()

  const drawPrize = ref<DrawPrize | null>(null)
  const drawPrizes = ref<DrawPrize[]>([])
  const drawPrizesWithWinner = ref<DrawPrizeWithWinner[]>([])

  const isLoading = ref(false)

  function $reset() {
    drawPrize.value = null
    drawPrizes.value = []
    drawPrizesWithWinner.value = []
    isLoading.value = false
  }

  async function fetchDrawPrizes(drawId: string) {
    isLoading.value = true
    try {
      const response = await request({ url: `/draw-prizes?${drawId}` })

      drawPrizes.value = response.data.data
      isLoading.value = false
    } catch (error) {
      isLoading.value = false
      $toast.error('Something went wrong')
    }
  }

  async function fetchSingleDrawPrizeById(id: string) {
    isLoading.value = true
    try {
      const response = await request({ url: `/draw-prizes/id=${id}` })

      drawPrize.value = response.data.data
      isLoading.value = false
    } catch (error) {
      isLoading.value = false
      $toast.error('Something went wrong')
    }
  }

  async function fetchDrawPrizeBySlug(slug: string) {
    isLoading.value = true
    try {
      const response = await request({ url: `/draw-prizes/slug=${slug}` })

      drawPrizes.value = response.data.data
      isLoading.value = false
    } catch (error) {
      isLoading.value = false
      $toast.error('Something went wrong')
    }
  }

  async function fetchWinnerDrawPrizeBySlug(slug: string) {
    isLoading.value = true
    try {
      const response = await request({ url: `/draw-prizes/slug=${slug}/winners` })

      drawPrizesWithWinner.value = response.data.data
      isLoading.value = false
    } catch (error) {
      isLoading.value = false
      $toast.error('Something went wrong')
    }
  }

  async function addDrawPrize(prizeData: CreateDrawPrize) {
    isLoading.value = true
    try {
      await request({
        url: '/draw-prizes',
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: {
          slug: prizeData.slug,
          title: prizeData.title,
          amount: prizeData.amount,
          rank: prizeData.rank,
          image: prizeData.image
        }
      })

      isLoading.value = false
    } catch (error) {
      isLoading.value = false
      $toast.error('Something went wrong')
    }
  }

  async function updateDrawPrize(id: string, prizeData: UpdateDrawPrize) {
    isLoading.value = true
    try {
      await request({
        url: `/draw-prizes/${id}`,
        method: 'PATCH',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: {
          slug: prizeData.slug,
          title: prizeData.title,
          amount: prizeData.amount,
          rank: prizeData.rank,
          image: prizeData.image
        }
      })

      isLoading.value = false
    } catch (error) {
      isLoading.value = false
      $toast.error('Something went wrong')
    }
  }

  async function deleteDrawPrize(id: string, slug: string) {
    isLoading.value = true
    try {
      await request({ url: `/draw-prizes/${id}`, method: 'DELETE' })

      isLoading.value = false
    } catch (error) {
      isLoading.value = false
      $toast.error('Something went wrong')
    }
  }

  return {
    drawPrize,
    drawPrizes,
    drawPrizesWithWinner,
    fetchDrawPrizes,
    fetchSingleDrawPrizeById,
    fetchDrawPrizeBySlug,
    fetchWinnerDrawPrizeBySlug,
    addDrawPrize,
    updateDrawPrize,
    deleteDrawPrize,
    isLoading,
    $reset
  }
})
