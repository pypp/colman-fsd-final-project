import type { RegisterDTO, LoginDTO, LogoutDTO, UserWithAuthTokens } from "@repo/types";
import { api } from ".";

export const registerRequest = (data: RegisterDTO) => api.post("/auth/register", data);
export const loginRequest = (data: LoginDTO) => api.post<UserWithAuthTokens>("/auth/login", data);
export const googleAuthRequest = (credential: string) =>
  api.post("/auth/google", { credential });
export const logoutRequest = (data: LogoutDTO) => api.post<{ message: string }>("/auth/logout", data);
