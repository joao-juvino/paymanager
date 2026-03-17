import type { LoginResponse } from "../../types/auth"
import { setAccessToken } from "../../utils/tokenStore"

export async function loginRequest(email: string, password: string) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || "Login failed")
  }

  const data = (await res.json()) as LoginResponse
  setAccessToken(data.accessToken)
  return data
}

export async function logoutRequest() {
  await fetch("/api/auth/logout", {
    method: "POST",
    credentials: "include"
  })
  setAccessToken(null)
}