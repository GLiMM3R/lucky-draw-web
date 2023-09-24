import request from '@/utils/request'
import { useRouter } from 'vue-router'

export default function useCampaign() {
  const router = useRouter()

  async function getCampaigns() {
    const res = await request({ url: '/campaigns' })
  }

  return { getCampaigns }
}
