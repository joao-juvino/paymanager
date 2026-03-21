import React from "react";
import type { UserRole } from "../../types/user";

const RegisterPaymentPage = React.lazy(() => import("./pages/RegisterPaymentPage"));
const AnalysePaymentPage = React.lazy(() => import("./pages/AnalysePaymentPage"));
const HistoryPaymentPage = React.lazy(() => import("./pages/HistoryPaymentPage"));

export const paymentRoutes: {
  path: string;
  element: React.ReactElement;
  allowedRoles: UserRole[];
}[] = [
  {
    path: "/payment/register",
    element: <RegisterPaymentPage />,
    allowedRoles: ["REGISTRATION", "AUTHORIZATION", "ADMIN"],
  },
  {
    path: "/payment/analyse",
    element: <AnalysePaymentPage />,
    allowedRoles: ["AUTHORIZATION", "ADMIN"],
  },
  {
    path: "/payment/history",
    element: <HistoryPaymentPage />,
    allowedRoles: ["REGISTRATION", "AUTHORIZATION", "ADMIN"],
  },
];