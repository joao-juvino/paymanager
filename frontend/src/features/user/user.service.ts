import api from "../../services/api";
import type { Role, UsersResponse } from "../../types/user";

type UsersQuery = {
  search?: string;
  page?: number;
  limit?: number;
};

export async function getUsers(params: UsersQuery) {
  const response = await api.get<UsersResponse>("/users", {
    params: {
      page: params.page ?? 1,
      limit: params.limit ?? 4,
      ...(params.search ? { search: params.search } : {}),
    },
  });

  return response.data;
}

export async function createUser(payload: {
  name: string;
  username?: string;
  email: string;
  password: string;
  role: Role;
}) {
  const response = await api.post("/users", payload);
  return response.data;
}

export async function updateUserRole(userId: number, role: Role) {
  const response = await api.patch(`/users/${userId}/role`, { role });
  return response.data;
}

export async function updateUserStatus(userId: number, isActive: boolean) {
  const response = await api.patch(`/users/${userId}/status`, { isActive });
  return response.data;
}