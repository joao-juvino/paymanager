import React from "react";

const ManageUsersPage = React.lazy(() => import("./pages/ManageUsersPage"));

export const userRoutes = [
  {
    path: "/users",
    element: <ManageUsersPage />,
    allowedRoles: ["ADMIN"],
  },
];