import api from "../../services/api"
import type { LoginResponse } from "../../types/auth"

export async function loginRequest(email: string, password: string) {
  try {
    const { data } = await api.post<LoginResponse>("/auth/login", {
      email,
      password,
    })

    return data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Login failed")
  }
}

export async function logoutRequest() {
  try {
    await api.post("/auth/logout")
  } catch {
    throw new Error("Logout failed")
  }
}