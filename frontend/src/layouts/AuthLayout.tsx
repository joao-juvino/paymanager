import { Outlet } from "react-router-dom"

export default function AuthLayout() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5"
      }}
    >
      <Outlet />
    </div>
  )
}