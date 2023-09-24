import { getAccessToken, getRefreshToken, setAccessToken } from '@/utils/token'
import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:3008',
  // baseURL: 'http://192.168.1.7:5044/api',
  timeout: 10000,
  headers: { 'content-type': 'application/json' }
})

http.interceptors.request.use(
  (config) => {
    if (getAccessToken()) {
      config.headers.Authorization = `Bearer ${getAccessToken()}`
    }

    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

http.interceptors.response.use(
  (response) => {
    if (response.status === 200 || response.status === 201) {
      return response
    } else {
      return Promise.reject(response || 'Error')
    }
  },
  async (error) => {
    console.log('🚀 ~ file: request.ts:34 ~ error.config:', error.config)
    if (error.config.url !== '/auth/signin' && error.response) {
      // if (error.response.status == 401) {
      // console.log('🚀 ~ file: request.ts:40 ~ getRefreshToken():', getRefreshToken())
      // try {
      //   const { data, status } = await http.post('/auth/refresh', {
      //     headers: {
      //       Authorization: `Bearer ${getRefreshToken()}`
      //     }
      //   })
      //   if (status == 201) {
      //     setAccessToken(data.data.access_token)
      //     setAccessToken(data.data.refresh_token)
      //   }
      // } catch (error) {
      //   location.href = '/login'
      //   return Promise.reject(error)
      // }
      // }
    }
    return Promise.reject(error)
  }
)

export default http
