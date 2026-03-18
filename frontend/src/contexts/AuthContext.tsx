import React, { createContext, useContext, useEffect, useState } from "react"
import { loginRequest, logoutRequest } from "../features/auth/auth.service"

type AuthContextType = {
  accessToken: string | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  async function refreshSession() {
    try {
      const res = await fetch("/api/auth/refresh", {
        method: "POST",
        credentials: "include",
      })

      if (!res.ok) {
        setAccessToken(null)
        return
      }

      const data = await res.json()
      setAccessToken(data.accessToken)
    } catch {
      setAccessToken(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refreshSession()
  }, [])

  async function login(email: string, password: string) {
    const data = await loginRequest(email, password)
    setAccessToken(data.accessToken)
  }

  async function logout() {
    await logoutRequest()
    setAccessToken(null)
  }

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        isAuthenticated: !!accessToken,
        login,
        logout,
      }}
    >
      {loading ? null : children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return ctx
}