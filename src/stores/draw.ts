import { defineStore } from 'pinia'
import { ref } from 'vue'
import request from '@/utils/request'
import { useToast } from 'vue-toast-notification'
import { useI18n } from 'vue-i18n'
import type { CreateDraw, Draw, DuplicateDraw, RequestDraw, UpdateDraw } from './types/draw'

export const useDrawStore = defineStore('draw', () => {
  const $toast = useToast()
  const i18n = useI18n()

  const draw = ref<Draw | null>(null)
  const draws = ref<Draw[]>([])
  const isLoading = ref(false)
  const errorMessage = ref('')

  function $reset() {
    draw.value = null
    draws.value = []
    isLoading.value = false
    errorMessage.value = ''
  }

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

      draw.value = response.data.data
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

  async function duplicateDraw(drawData: DuplicateDraw) {
    isLoading.value = true
    try {
      await request({
        url: `/draws/${drawData.id}/duplicate`,
        method: 'POST',
        data: {
          title: drawData.title
        }
      })

      isLoading.value = false
    } catch (error) {
      isLoading.value = false
      $toast.error(error.response.data.message)
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

  async function removeBackgroundImage(id: string) {
    isLoading.value = true
    try {
      await request({
        url: `/draws/${id}/remove-background`,
        method: 'POST'
      })

      isLoading.value = false
    } catch (error) {
      isLoading.value = false
      $toast.error(i18n.t('alert.apiError'))
    }
  }

  async function removeLoadingImage(id: string) {
    isLoading.value = true
    try {
      await request({
        url: `/draws/${id}/remove-loading`,
        method: 'POST'
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
      await request({
        url: '/draws/lucky-draw',
        method: 'POST',
        data: drawData
      })

      isLoading.value = false
    } catch (error) {
      isLoading.value = false
      $toast.error(error.response.data.message)
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
    duplicateDraw,
    deleteDraw,
    removeBackgroundImage,
    removeLoadingImage,
    uploadFileDataset,
    luckyDraw,
    isLoading,
    errorMessage,
    $reset
  }
})
