import { apiClient } from "./client";
import type { AuthResponse } from "@/types";

export const authApi = {
  login: async (
    email: string,
    password: string,
  ): Promise<{ data?: AuthResponse; error?: string }> => {
    try {
      const response = await apiClient
        .post("auth/login", { json: { email, password } })
        .json<AuthResponse>();
      return { data: response };
    } catch (error: any) {
      const errorMessage =
        error?.response?.statusText || error?.message || "Login failed";
      return { error: errorMessage };
    }
  },

  logout: async () => {
    try {
      return await apiClient.post("auth/logout").json<{ message: string }>();
    } catch (error: any) {
      const errorMessage =
        error?.response?.statusText || error?.message || "Logout failed";
      return { error: errorMessage };
    }
  },
};
