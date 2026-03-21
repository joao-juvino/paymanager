import { Navigate, Outlet } from "react-router-dom";

type Props = {
  allowedRoles: string[];
};

export default function RoleGuard({ allowedRoles }: Props) {
  const userRaw = localStorage.getItem("user");

  if (!userRaw) {
    return <Navigate to="/login" replace />;
  }

  const user = JSON.parse(userRaw);

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/payment/register" replace />;
  }

  return <Outlet />;
}