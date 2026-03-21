import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios"

let getToken: () => string | null = () => null

export function setTokenGetter(fn: () => string | null) {
  getToken = fn
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
})

const refreshClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
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
  const token = getToken()
  if (token && config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }
    const ignoredPaths = ['/auth/login', '/auth/register', '/auth/refresh']
    if (ignoredPaths.some(path => originalRequest.url?.includes(path))) {
      return Promise.reject(error)
    }

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
        const { data } = await refreshClient.post("/auth/refresh")

        const newToken = data.accessToken

        processQueue(null, newToken)
        isRefreshing = false

        if (originalRequest.headers) {
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`
        }

        return api(originalRequest)
      } catch (err) {
        processQueue(err, null)
        isRefreshing = false

        window.location.assign("/login")

        return Promise.reject(err)
      }
    }

    return Promise.reject(error)
  }
)

export default api