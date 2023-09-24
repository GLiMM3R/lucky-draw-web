import request from '@/utils/request'
import { useRouter } from 'vue-router'
import { getAccessToken } from '../utils/token'
import axios from 'axios'

export default function useCampaign() {
  const router = useRouter()
  async function getCampaigns() {
    const res = await request({ url: '/campaigns' })
  }

  return { getCampaigns }
}
