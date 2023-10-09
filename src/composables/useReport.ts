import request from '@/utils/request'
import { ref } from 'vue'
import { useToast } from 'vue-toast-notification'

export default function useReport() {
  const $toast = useToast()
  const isLoading = ref(false)

  const getReport = async (id: string) => {
    const response = await request({
      url: `/reports/${id}`,
      method: 'GET',
      responseType: 'blob'
    })

    if (response.status === 200) {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', response.data)
      document.body.appendChild(link)
      link.click()
      isLoading.value = false
    } else {
      isLoading.value = false
      $toast.error('Something went wrong')
      return
    }
  }

  return { getReport }
}
