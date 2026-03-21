export type Role = 'REGISTRATION' | 'AUTHORIZATION' | 'ADMIN';
export type UserStatus = 'Active' | 'Inactive';

export type UserField = {
  type: 'text' | 'password' | 'select';
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
  placeHolder: string;
  options?: { label: string; value: Role }[];
};

export type UserRow = {
  id: number;
  name: string;
  username: string;
  role: Role;
  status: UserStatus;
  lastActivity: string;
};

export type UserForm = {
  name: string;
  username: string;
  email: string;
  password: string;
  role: Role | '';
};

export type UsersMeta = {
  page: number;
  limit: number;
  totalRecords: number;
  totalPages: number;
};

export type UsersStatistics = {
  activeUsers: number;
  totalRecords: number;
};

export type UsersResponse = {
  items: UserRow[];
  meta: UsersMeta;
  statistics: UsersStatistics;
};

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


export type Status = "Active" | "Inactive";
