import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import MainLayout from "../../layouts/MainLayout";
import AuthGuard from "./guards/AuthGuard";
import PublicGuard from "./guards/PublicGuard";
import RegisterPaymentPage from "../../features/payment/pages/RegisterPaymentPage";
import { paymentRoutes } from "../../features/payment/routes";

const LoginPage = React.lazy(() => import("../../features/auth/pages/LoginPage"));

export default function AppRoutes() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <Routes>

        {/* PUBLIC */}
        <Route element={<PublicGuard />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>
        </Route>

        {/* PRIVATE */}
        <Route element={<AuthGuard />}>
          <Route element={<MainLayout />}>
            {/* <Route path="/payment/register" element={<RegisterPaymentPage />} /> */}
            {paymentRoutes.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
          </Route>
        </Route>

        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </Suspense>
  );
}