import { ref } from 'vue'
import { useToast } from 'vue-toast-notification'
import request from '@/utils/request'

export default function useImage() {
  const $toast = useToast()
  const isLoading = ref(false)

  function blobToData(blob: Blob) {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result)
      reader.readAsDataURL(blob)
    })
  }

  async function getImage(source: string) {
    isLoading.value = true
    try {
      const response = await request({ url: `/files/${source}`, responseType: 'blob' })

      isLoading.value = false
      const imageBlob = await blobToData(response.data)
      return imageBlob
    } catch (error) {
      isLoading.value = false
      $toast.error('Something went wrong')
    }
  }

  return { getImage, isLoading }
}
