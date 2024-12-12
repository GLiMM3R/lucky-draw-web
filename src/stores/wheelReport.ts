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

  function $reset() {
    wheelReports.value = []
    wheelReportsWithIncludes.value = []
    isLoading.value = false
  }

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

  async function addWheelReport(wheelId: string, prizeId: string) {
    isLoading.value = true
    try {
      await request({
        url: `/wheel-reports`,
        method: 'POST',
        data: { wheelId, prizeId }
      })

      isLoading.value = false
    } catch (error) {
      isLoading.value = false
      $toast.error('Something went wrong')
    }
  }

  const downloadWheelReportById = async (wheelId: string, title: string) => {
    try {
      const response = await request({
        url: `/wheel-reports/download/id=${wheelId}`,
        method: 'GET',
        responseType: 'blob'
      })

      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `${title}.xlsx`)
      document.body.appendChild(link)
      link.click()
      isLoading.value = false
    } catch (error) {
      isLoading.value = false
      $toast.error('Something went wrong')
    }
  }

  const downloadWheelReportBySlug = async (slug: string, title: string) => {
    try {
      const response = await request({
        url: `/wheel-reports/download/slug=${slug}`,
        method: 'GET',
        responseType: 'blob'
      })

      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `${title}.xlsx`)
      document.body.appendChild(link)
      link.click()
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
    addWheelReport,
    fetchWheelReportsByPrizeId,
    fetchWheelReports,
    downloadWheelReportById,
    downloadWheelReportBySlug,
    $reset
  }
})
