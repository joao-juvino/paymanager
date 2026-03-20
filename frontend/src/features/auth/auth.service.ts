import api from "../../services/api";
import type { LoginPayload } from "../../types/auth";
import type { User } from "../../types/user";

export async function login(payload: LoginPayload): Promise<User> {
  try {
    const { data } = await api.post("/auth/login", payload);
    return data;
  } catch (error: any) {
    if (error.response) {
      const message =
        error.response.data?.message || "Invalid credentials";
      throw new Error(message);
    }

    throw new Error("Network error. Try again.");
  }
}

export async function logout(): Promise<void> {
  try {
    await api.post("/auth/logout");
  } catch (error: any) {
    if (error.response) {
      const message = error.response.data?.message || "Cannot logout";
      throw new Error(message);
    }
    throw new Error("Network error. Try again.");
  }
}