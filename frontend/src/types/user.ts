import type { LucideIcon } from "lucide-react";

export type BackendRole = {
  REGISTRATION: string;
  AUTHORIZATION: string
  ADMIN: string;
}

export type UserRole = "REGISTRATION" | "AUTHORIZATION" | "ADMIN";

export interface User {
  id: number;
  email: string;
  name: string | null;
  role: UserRole;
  createdAt: string;
}

export type Options = {
  label: string;
  value: string;
}

export type UserField = {
  type: "text" | "password" | "select";
  label: string;
  Icon: LucideIcon;
  placeHolder: string;
  options?: Options[];
};

export type Role = "Admin" | "Authorizer" | "Requester";
export type Status = "Active" | "Inactive";

export type UserRow = {
  name: string;
  username: string;
  role: Role;
  status: Status;
  lastActivity: string;
}