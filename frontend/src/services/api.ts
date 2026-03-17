import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios"
import { getAccessToken, setAccessToken } from "../utils/tokenStore"

const api = axios.create({
  baseURL: "/api",
  withCredentials: true 
})

let isRefreshing = false
let failedQueue: {
  resolve: (value?: unknown) => void
  reject: (reason?: any) => void
  config: InternalAxiosRequestConfig
}[] = []

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((p) => {
    if (error) p.reject(error)
    else {
      if (token && p.config.headers) {
        p.config.headers["Authorization"] = `Bearer ${token}`
      }
      p.resolve(p.config)
    }
  })
  failedQueue = []
}

api.interceptors.request.use((config) => {
  const token = getAccessToken()
  if (token && config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }

    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403) &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject, config: originalRequest })
        }).then((cfg) => api(cfg as InternalAxiosRequestConfig))
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const res = await fetch("/api/auth/refresh", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" }
        })

        if (!res.ok) throw new Error("Refresh failed")

        const data = await res.json()
        const newToken = data.accessToken
        setAccessToken(newToken)

        processQueue(null, newToken)
        isRefreshing = false

        if (originalRequest.headers) {
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`
        }

        return api(originalRequest)
      } catch (err) {
        processQueue(err, null)
        isRefreshing = false
        setAccessToken(null)
        return Promise.reject(err)
      }
    }

    return Promise.reject(error)
  }
)

export default api