import type { UserProfile } from "@repo/types";
import { api } from ".";

export const getUserByUsername = async (username: string) => {
  const response = await api.get<UserProfile>(`/users/${username}`);
  return response.data;
};
