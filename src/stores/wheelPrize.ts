import { defineStore } from 'pinia'
import request from '@/utils/request'
import { ref } from 'vue'
import { useToast } from 'vue-toast-notification'
import type { CreateWheelPrize, UpdateWheelPrize, WheelPrize } from './types/wheelPrize'

export const useWheelPrizeStore = defineStore('wheelPrize', () => {
  const $toast = useToast()

  const wheelPrize = ref<WheelPrize | null>(null)
  const wheelPrizes = ref<WheelPrize[]>([])

  const isLoading = ref(false)

  function $reset() {
    wheelPrize.value = null
    wheelPrizes.value = []
    isLoading.value = false
  }

  async function fetchWheelPrizes(wheelId: string) {
    isLoading.value = true
    try {
      const response = await request({ url: `/wheel-prizes?${wheelId}` })

      wheelPrizes.value = response.data.data
      isLoading.value = false
    } catch (error) {
      isLoading.value = false
      $toast.error('Something went wrong')
    }
  }

  async function fetchSingleWheelPrizeById(id: string) {
    isLoading.value = true
    try {
      const response = await request({ url: `/wheel-prizes/id=${id}` })

      wheelPrize.value = response.data.data
      isLoading.value = false
    } catch (error) {
      isLoading.value = false
      $toast.error('Something went wrong')
    }
  }

  async function fetchWheelPrizeBySlug(slug: string) {
    isLoading.value = true
    try {
      const response = await request({ url: `/wheel-prizes/slug=${slug}` })

      wheelPrizes.value = response.data.data
      isLoading.value = false
    } catch (error) {
      isLoading.value = false
      $toast.error('Something went wrong')
    }
  }

  async function addWheelPrize(prizeData: CreateWheelPrize) {
    isLoading.value = true
    try {
      await request({
        url: '/wheel-prizes',
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: {
          slug: prizeData.slug,
          title: prizeData.title,
          amount: prizeData.amount,
          image: prizeData.image
        }
      })

      isLoading.value = false
    } catch (error) {
      isLoading.value = false
      $toast.error(error)
    }
  }

  async function updateWheelPrize(id: string, prizeData: UpdateWheelPrize) {
    isLoading.value = true
    try {
      await request({
        url: `/wheel-prizes/${id}`,
        method: 'PATCH',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: {
          slug: prizeData.slug,
          title: prizeData.title,
          amount: prizeData.amount,
          image: prizeData.image
        }
      })

      isLoading.value = false
    } catch (error) {
      isLoading.value = false
      $toast.error('Something went wrong')
    }
  }

  async function deleteWheelPrize(id: string, slug: string) {
    isLoading.value = true
    try {
      await request({ url: `/wheel-prizes/${id}`, method: 'DELETE' })

      isLoading.value = false
    } catch (error) {
      isLoading.value = false
      $toast.error('Something went wrong')
    }
  }

  return {
    wheelPrize,
    wheelPrizes,
    fetchWheelPrizes,
    fetchSingleWheelPrizeById,
    fetchWheelPrizeBySlug,
    addWheelPrize,
    updateWheelPrize,
    deleteWheelPrize,
    isLoading,
    $reset
  }
})
