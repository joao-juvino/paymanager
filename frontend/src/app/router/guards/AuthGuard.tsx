import { Navigate, Outlet } from "react-router-dom";

export default function AuthGuard() {
  const user = localStorage.getItem("user");

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}