import { userStore } from '@/stores/user'
import request from '@/utils/request'
import { setAccessToken, setRefreshToken } from '@/utils/token'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default function useUser() {
  const router = useRouter()
  const { state } = userStore()

  const isLoading = ref(false)

  const urlPath = '/auth/signin'

  async function login(username: string, password: string) {
    isLoading.value = true

    const { data, status } = await request({
      url: urlPath,
      method: 'POST',
      data: { username, password }
    })

    if (status == 201) {
      state.isAuthenticate = true
      setAccessToken(data.data.access_token)
      setRefreshToken(data.data.refresh_token)
      isLoading.value = false

      router.push('/home')
    } else {
      isLoading.value = false
    }
  }

  return { login, isLoading, state }
}
