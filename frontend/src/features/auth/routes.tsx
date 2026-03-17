import React from "react"
const LoginPage = React.lazy(() => import("./pages/LoginPage"))

export const authRoutes = [
  {
    path: "/login",
    element: <LoginPage />
  }
]