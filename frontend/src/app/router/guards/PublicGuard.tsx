import { Navigate, Outlet } from "react-router-dom";

export default function PublicGuard() {
  const user = localStorage.getItem("user");

  if (user) {
    return <Navigate to="/payment/register" replace />;
  }

  return <Outlet />;
}