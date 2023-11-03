import { defineStore } from 'pinia'
import { ref } from 'vue'
import request from '@/utils/request'
import { useToast } from 'vue-toast-notification'
import { useI18n } from 'vue-i18n'
import type { CreateDraw, Draw, RequestDraw, UpdateDraw } from './types/draw'

export const useDrawStore = defineStore('draw', () => {
  const $toast = useToast()
  const i18n = useI18n()

  const draw = ref<Draw | null>(null)
  const draws = ref<Draw[]>([])
  const isLoading = ref(false)
  const errorMessage = ref('')

  async function fetchDraws() {
    draws.value = []
    isLoading.value = true
    try {
      const response = await request({
        url: '/draws'
      })

      draws.value = response.data.data
      isLoading.value = false
    } catch (error) {
      isLoading.value = false
      $toast.error('Something went wrong')
    }
  }

  async function fetchSingleDrawById(id: string) {
    draw.value = null
    isLoading.value = true
    try {
      const response = await request({
        url: `/draws/id=${id}`
      })

      draw.value = response.data.data
      isLoading.value = false
    } catch (error) {
      isLoading.value = false
      $toast.error(i18n.t('alert.apiError'))
    }
  }

  async function fetchDrawBySlug(slug: string) {
    draw.value = null
    isLoading.value = true
    try {
      const response = await request({
        url: `/draws/slug=${slug}`
      })

      draws.value = response.data.data
      isLoading.value = false
    } catch (error) {
      isLoading.value = false
      $toast.error(i18n.t('alert.apiError'))
    }
  }

  async function addDraw(drawData: CreateDraw) {
    isLoading.value = true
    try {
      await request({
        url: '/draws',
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: {
          title: drawData.title,
          prizeCap: drawData.prizeCap,
          backgroundImage: drawData.backgroundImage,
          loadingImage: drawData.loadingImage,
          device: drawData.device
        }
      })

      isLoading.value = false
    } catch (error) {
      isLoading.value = false
      $toast.error(i18n.t('alert.apiError'))
    }
  }

  async function updateDraw(drawData: UpdateDraw) {
    isLoading.value = true
    try {
      await request({
        url: `/draws/${drawData.id}`,
        method: 'PATCH',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: {
          title: drawData.title,
          prizeCap: drawData.prizeCap,
          backgroundImage: drawData.backgroundImage,
          loadingImage: drawData.loadingImage,
          device: drawData.device,
          isComplete: drawData.isComplete
        }
      })

      isLoading.value = false
    } catch (error) {
      isLoading.value = false
      $toast.error(i18n.t('alert.apiError'))
    }
  }

  async function deleteDraw(id: string) {
    isLoading.value = true
    try {
      await request({
        url: `/draws/${id}`,
        method: 'DELETE'
      })

      isLoading.value = false
    } catch (error) {
      isLoading.value = false
      $toast.error(i18n.t('alert.apiError'))
    }
  }

  async function uploadFileDataset(id: string, file: File) {
    isLoading.value = true
    try {
      await request({
        url: `/draws/${id}/dataset`,
        method: 'PATCH',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: {
          file: file
        }
      })

      isLoading.value = false
    } catch (error) {
      isLoading.value = false
      $toast.error(i18n.t('alert.apiError'))
    }
  }

  async function luckyDraw(drawData: RequestDraw) {
    isLoading.value = true
    try {
      const response = await request({
        url: '/draws/lucky-draw',
        method: 'POST',
        data: drawData
      })

      if (response.response.status === 400) {
        errorMessage.value = response.response.data.message
        isLoading.value = false
        return
      }

      isLoading.value = false
    } catch (error) {
      isLoading.value = false
      $toast.error('Something went wrong')
    }
  }

  return {
    draw,
    draws,
    fetchDraws,
    fetchSingleDrawById,
    fetchDrawBySlug,
    addDraw,
    updateDraw,
    deleteDraw,
    uploadFileDataset,
    luckyDraw,
    isLoading,
    errorMessage
  }
})
