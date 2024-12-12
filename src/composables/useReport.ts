import request from '@/utils/request'
import { ref } from 'vue'
import { useToast } from 'vue-toast-notification'

export default function useReport() {
  const $toast = useToast()
  const isLoading = ref(false)

  const downloadReport = async (id: string, title: string) => {
    try {
      const response = await request({
        url: `/randoms/${id}`,
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

  return { downloadReport }
}
