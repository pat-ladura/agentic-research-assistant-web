import ky from "ky";
import { useAuthStore } from "@/store/auth.store";

const API_KEY = import.meta.env.VITE_API_KEY as string;

export const apiClient = ky.create({
  prefix: "/api",
  throwHttpErrors: false,
  hooks: {
    beforeRequest: [
      (request) => {
        const token = useAuthStore.getState().token;
        if (token)
          request.request.headers.set("Authorization", `Bearer ${token}`);
        if (API_KEY) request.request.headers.set("x-api-key", API_KEY);
      },
    ],
    afterResponse: [
      async (state) => {
        if (state.response.status === 401) {
          useAuthStore.getState().clearAuth();
          window.location.href = "/login";
        }
      },
    ],
  },
});
