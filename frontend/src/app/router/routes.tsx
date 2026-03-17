import React, { Suspense } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import AuthLayout from "../../layouts/AuthLayout"
import MainLayout from "../../layouts/MainLayout"
import AuthGuard from "./guards/AuthGuard"
import DashboardPage from "../../features/dashboard/pages/DashboardPage"

const LoginPage = React.lazy(() => import("../../features/auth/pages/LoginPage"))

export default function AppRoutes() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route element={<AuthGuard />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<DashboardPage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  )
}