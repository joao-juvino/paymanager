export type LoginResponse = { accessToken: string }

export type AuthContextType = {
  accessToken: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  isAuthenticated: boolean
}