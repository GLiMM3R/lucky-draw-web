import { defineStore } from 'pinia'
import { ref } from 'vue'
import request from '@/utils/request'
import { useToast } from 'vue-toast-notification'
import { useI18n } from 'vue-i18n'
import type { CreateWheel, UpdateWheel, Wheel } from './types/wheel'

export const useWheelStore = defineStore('wheel', () => {
  const $toast = useToast()
  const i18n = useI18n()

  const wheel = ref<Wheel | null>(null)
  const wheels = ref<Wheel[]>([])
  const isLoading = ref(false)
  const errorMessage = ref('')

  async function fetchWheels() {
    wheels.value = []
    isLoading.value = true
    try {
      const response = await request({
        url: '/wheels'
      })

      wheels.value = response.data.data
      isLoading.value = false
    } catch (error) {
      isLoading.value = false
      $toast.error('Something went wrong')
    }
  }

  async function fetchSingleWheelById(id: string) {
    wheel.value = null
    isLoading.value = true
    try {
      const response = await request({
        url: `/wheels/id=${id}`
      })

      wheel.value = response.data.data
      isLoading.value = false
    } catch (error) {
      isLoading.value = false
      $toast.error(i18n.t('alert.apiError'))
    }
  }

  async function fetchWheelBySlug(slug: string) {
    wheel.value = null
    isLoading.value = true
    try {
      const response = await request({
        url: `/wheels/slug=${slug}`
      })

      wheel.value = response.data.data
      isLoading.value = false
    } catch (error) {
      isLoading.value = false
      $toast.error(i18n.t('alert.apiError'))
    }
  }

  async function addWheel(wheelData: CreateWheel) {
    isLoading.value = true
    try {
      await request({
        url: '/wheels',
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: {
          title: wheelData.title,
          baseIcon: wheelData.baseIcon
        }
      })

      isLoading.value = false
    } catch (error) {
      isLoading.value = false
      $toast.error(i18n.t('alert.apiError'))
    }
  }

  async function updateWheel(wheelData: UpdateWheel) {
    isLoading.value = true
    try {
      await request({
        url: `/wheels/${wheelData.id}`,
        method: 'PATCH',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: {
          title: wheelData.title,
          baseIcon: wheelData.baseIcon,
          isComplete: wheelData.isComplete
        }
      })

      isLoading.value = false
    } catch (error) {
      isLoading.value = false
      $toast.error(i18n.t('alert.apiError'))
    }
  }

  async function deleteWheel(id: string) {
    isLoading.value = true
    try {
      await request({
        url: `/wheels/${id}`,
        method: 'DELETE'
      })

      isLoading.value = false
    } catch (error) {
      isLoading.value = false
      $toast.error(i18n.t('alert.apiError'))
    }
  }

  return {
    wheel,
    wheels,
    fetchWheels,
    fetchSingleWheelById,
    fetchWheelBySlug,
    addWheel,
    updateWheel,
    deleteWheel,
    isLoading,
    errorMessage
  }
})
