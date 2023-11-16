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

  function $reset() {
    drawReports.value = []
    drawReportsWithIncludes.value = []
  }

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

  async function fetchDrawReportsBySlug(slug: string) {
    isLoading.value = true
    try {
      const response = await request({ url: `/draw-reports/slug=${slug}` })

      drawReportsWithIncludes.value = response.data.data
      isLoading.value = false
    } catch (error) {
      isLoading.value = false
      $toast.error('Something went wrong')
    }
  }

  async function fetchDrawReportsByPrizeId(slug: string, drawId: string) {
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

  const downloadDrawReportById = async (id: string, title: string) => {
    try {
      const response = await request({
        url: `/draw-reports/id=${id}`,
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

  const downloadDrawReportBySlug = async (slug: string, title: string) => {
    try {
      const response = await request({
        url: `/draw-reports/slug=${slug}`,
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
    drawReports,
    drawReportsWithIncludes,
    downloadDrawReportById,
    downloadDrawReportBySlug,
    fetchDrawReports,
    fetchDrawReportsByPrizeId,
    fetchDrawReportsBySlug,
    $reset
  }
})
