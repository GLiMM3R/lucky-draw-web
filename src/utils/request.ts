import { getToken } from '@/utils/token'
import type { AxiosInstance, AxiosResponse } from 'axios'
import axios from 'axios'

const http: AxiosInstance = axios.create({
  // baseURL: "http://localhost:5044/api",
  baseURL: 'http://192.168.1.7:5044/api',
  timeout: 10000,
  headers: { 'content-type': 'application/json' }
})

http.interceptors.response.use(
  (config) => {
    if (getToken()) {
      config.headers.Authorization = `Bearer ${getToken()}`
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
  (error) => {
    if (error.response.status) {
      switch (error.response.status) {
        case 401:
          break
      }
      return Promise.reject(error)
    }
  }
)

export default http
