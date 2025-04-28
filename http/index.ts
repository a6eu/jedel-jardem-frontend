import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://jedel-jardem.space/api',
  timeout: 2000
})

if (typeof window !== 'undefined') {
  api.interceptors.request.use(
    (config) => {
      const token = window.localStorage.getItem('access')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error) => Promise.reject(error)
  )
}

