import type { LucideIcon } from "lucide-react";

export interface User {
  id: number;
  email: string;
  name: string;
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