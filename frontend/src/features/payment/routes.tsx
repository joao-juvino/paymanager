import React from "react"
const RegisterPaymentPage = React.lazy(() => import("./pages/RegisterPaymentPage"))
const AnalysePaymentPage = React.lazy(() => import("./pages/AnalysePaymentPage"))
const HistoryPaymentPage = React.lazy(() => import("./pages/HistoryPaymentPage"))

export const paymentRoutes = [
  {
    path: "/payment/register",
    element: <RegisterPaymentPage />
  },
  {
    path: "/payment/analyse",
    element: <AnalysePaymentPage />
  },
  {
    path: "/payment/history",
    element: <HistoryPaymentPage />
  }
]