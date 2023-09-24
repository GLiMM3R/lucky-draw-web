import { useRouter } from 'vue-router'

export default function useAppRoute() {
  const router = useRouter()
  function goToLogin() {
    router.push('/login')
  }

  return { goToLogin }
}
