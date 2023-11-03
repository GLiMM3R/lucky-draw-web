import { defineStore } from 'pinia'
import request from '@/utils/request'
import { ref } from 'vue'
import { useToast } from 'vue-toast-notification'
import type { DrawReport, DrawReportWithIncludes } from './types/drawReport'

export const useDrawReportStore = defineStore('drawReport', () => {
  const $toast = useToast()

  const drawReports = ref<DrawReport[]>([])
  const drawReportsWithIncludes = ref<DrawReportWithIncludes[]>([])

  const isLoading = ref(false)

  async function fetchDrawReports(drawId: string) {
    isLoading.value = true
    try {
      const response = await request({ url: `/draw-reports/${drawId}` })

      drawReportsWithIncludes.value = response.data.data
      isLoading.value = false
    } catch (error) {
      isLoading.value = false
      $toast.error('Something went wrong')
    }
  }

  async function getDrawReportsByPrizeId(slug: string, drawId: string) {
    isLoading.value = true
    try {
      const response = await request({ url: `/draw-reports/${slug}/${drawId}` })

      drawReports.value = response.data.data
      isLoading.value = false
    } catch (error) {
      isLoading.value = false
      $toast.error('Something went wrong')
    }
  }

  return { drawReports, drawReportsWithIncludes, fetchDrawReports, getDrawReportsByPrizeId }
})
