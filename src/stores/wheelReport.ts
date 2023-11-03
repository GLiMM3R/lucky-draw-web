import { defineStore } from 'pinia'
import request from '@/utils/request'
import { ref } from 'vue'
import { useToast } from 'vue-toast-notification'
import type { WheelReport, WheelReportWithIncludes } from './types/wheelReport'

export const useWheelReportStore = defineStore('wheelReport', () => {
  const $toast = useToast()

  const wheelReports = ref<WheelReport[]>([])
  const wheelReportsWithIncludes = ref<WheelReportWithIncludes[]>([])

  const isLoading = ref(false)

  async function fetchWheelReports(wheelId: string) {
    isLoading.value = true
    try {
      const response = await request({ url: `/wheel-reports/${wheelId}` })

      wheelReportsWithIncludes.value = response.data.data
      isLoading.value = false
    } catch (error) {
      isLoading.value = false
      $toast.error('Something went wrong')
    }
  }

  async function fetchWheelReportsByPrizeId(slug: string, drawId: string) {
    isLoading.value = true
    try {
      const response = await request({ url: `/wheel-reports/${slug}/${drawId}` })

      wheelReports.value = response.data.data
      isLoading.value = false
    } catch (error) {
      isLoading.value = false
      $toast.error('Something went wrong')
    }
  }

  return {
    wheelReports,
    wheelReportsWithIncludes,
    isLoading,
    fetchWheelReportsByPrizeId,
    fetchWheelReports
  }
})
