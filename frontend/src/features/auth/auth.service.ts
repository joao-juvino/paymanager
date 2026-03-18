import api from "../../services/api"
import type { LoginResponse } from "../../types/auth"
import { setAccessToken } from "../../utils/tokenStore"

export async function loginRequest(email: string, password: string) {
  try {
    const { data } = await api.post<LoginResponse>("/auth/login", {
      email,
      password
    })

    setAccessToken(data.accessToken)

    return data
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Login failed"
    )
  }
}

export async function logoutRequest() {
  try {
    await api.post("/auth/logout")
    setAccessToken(null)
  } catch {
    throw new Error("Logout failed")
  }
}