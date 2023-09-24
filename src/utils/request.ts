import {
  getAccessToken,
  getRefreshToken,
  isTokenExpired,
  setAccessToken,
  setRefreshToken
} from '@/utils/token'
import axios from 'axios'

const http = axios.create({
  // baseURL: 'http://localhost:3008',
  baseURL: 'http://192.168.1.8:3008',
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
    const originalConfig = error.config
    // if (error.config.url !== '/auth/signin' && error.response) {
    if (error.response.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true

      try {
        const { data, status } = await http({
          url: '/auth/refresh',
          method: 'POST'
        })

        if (status == 200) {
          setAccessToken(data.data.access_token)
          setRefreshToken(data.data.refresh_token)

          http.defaults.headers.Authorization = data.data.access_token
        }
      } catch (error) {
        return Promise.reject(error)
      }
    }
    //   try {
    //     const { data, status } = await http('http://192.168.1.8:3008/auth/refresh', {
    //       headers: {
    //         Authorization: `Bearer ${getRefreshToken()}`
    //       }
    //     })
    //     if (status == 201) {
    //       setAccessToken(data.data.access_token)
    //       setRefreshToken(data.data.refresh_token)
    //     }
    //   } catch (error) {
    //     location.href = '/login'
    //     return Promise.reject(error)
    //   }
    // }
    // }
    return Promise.reject(error)
  }
)

export default http
