import React from "react"
const DashboardPage = React.lazy(() => import("./pages/DashboardPage"))

export const dashboardRoutes = [
  {
    path: "/",
    element: <DashboardPage />
  }
]