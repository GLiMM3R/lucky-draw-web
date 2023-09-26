import {
  getAccessToken,
  getRefreshToken,
  removeAccessToken,
  removeRefreshToken,
  setAccessToken,
  setRefreshToken
} from '@/utils/token'
import axios from 'axios'

const axiosApiInstance = axios.create({
  baseURL: 'http://localhost:3008',
  // baseURL: 'http://192.168.1.8:3008',
  timeout: 10000,
  headers: { 'content-type': 'application/json' }
})

axiosApiInstance.interceptors.request.use(
  async (config) => {
    if (getAccessToken()) {
      config.headers.Authorization = `Bearer ${getAccessToken()}`
    }

    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

axiosApiInstance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const prevRequest = error.config
    if (error.response.status === 401 && !prevRequest.sent) {
      prevRequest.sent = true

      try {
        const { data, status } = await axios.get('http://localhost:3008/auth/refresh', {
          headers: {
            Authorization: `Bearer ${getRefreshToken()}`
          }
        })

        setAccessToken(data.data.access_token)
        setRefreshToken(data.data.refresh_token)

        prevRequest.headers['Authorization'] = `Bearer ${getAccessToken()}`
        return axiosApiInstance(prevRequest)
      } catch (error) {
        removeAccessToken()
        removeRefreshToken()
        location.replace('/login')
        return Promise.reject(error)
      }
    }
    return Promise.reject(error)
  }
)

export default axiosApiInstance
