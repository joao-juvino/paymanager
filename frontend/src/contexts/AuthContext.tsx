import React, { createContext, useContext, useEffect, useState } from "react"
import { loginRequest, logoutRequest } from "../features/auth/auth.service"
import { setAccessToken as setTokenStore } from "../utils/tokenStore"
import api from "../services/api"
import type { AuthContextType } from "../types/auth"

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const res = await fetch("/api/auth/refresh", {
          method: "POST",
          credentials: "include"
        })
        if (res.ok) {
          const data = await res.json()
          if (mounted) {
            setAccessToken(data.accessToken)
            setTokenStore(data.accessToken)
          }
        } else {
          setAccessToken(null)
          setTokenStore(null)
        }
      } catch (e) {
        setAccessToken(null)
        setTokenStore(null)
      } finally {
        if (mounted) setLoading(false)
      }
    })()

    return () => {
      mounted = false
    }
  }, [])

  useEffect(() => {
    if (!accessToken) return
    const payload = JSON.parse(atob(accessToken.split(".")[1]))
    const exp = payload.exp as number
    const now = Math.floor(Date.now() / 1000)
    const ttl = exp - now
    const timeout = Math.max((ttl - 60) * 1000, 0)
    const id = setTimeout(async () => {
      try {
        const res = await fetch("/api/auth/refresh", {
          method: "POST",
          credentials: "include"
        })
        if (res.ok) {
          const data = await res.json()
          setAccessToken(data.accessToken)
          setTokenStore(data.accessToken)
        } else {
          setAccessToken(null)
          setTokenStore(null)
        }
      } catch {
        setAccessToken(null)
        setTokenStore(null)
      }
    }, timeout)

    return () => clearTimeout(id)
  }, [accessToken])

  async function login(email: string, password: string) {
    const data = await loginRequest(email, password)
    setAccessToken(data.accessToken)
    setTokenStore(data.accessToken)
  }

  async function logout() {
    await logoutRequest()
    setAccessToken(null)
    setTokenStore(null)
  }

  return (
    <AuthContext.Provider value={{ accessToken, login, logout, isAuthenticated: !!accessToken }}>
      {loading ? null : children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}