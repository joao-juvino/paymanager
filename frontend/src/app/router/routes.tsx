import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import MainLayout from "../../layouts/MainLayout";
import AuthGuard from "./guards/AuthGuard";
import PublicGuard from "./guards/PublicGuard";
import RoleGuard from "./guards/RoleGuard";

import { paymentRoutes } from "../../features/payment/routes";
import { userRoutes } from "../../features/user/routes";

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

            {/* Payment com RBAC */}
            {paymentRoutes.map((route) => (
              <Route
                key={route.path}
                element={<RoleGuard allowedRoles={route.allowedRoles} />}
              >
                <Route path={route.path} element={route.element} />
              </Route>
            ))}

            {/* User (exemplo: só ADMIN) */}
            {userRoutes.map((route) => (
              <Route
                key={route.path}
                element={<RoleGuard allowedRoles={["ADMIN"]} />}
              >
                <Route path={route.path} element={route.element} />
              </Route>
            ))}

          </Route>
        </Route>

        {/* 404 */}
        <Route path="*" element={<div>Not Found</div>} />

      </Routes>
    </Suspense>
  );
}