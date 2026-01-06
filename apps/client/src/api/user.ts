import { api } from ".";

export const getPostByUsername = async (username: string) => {
  const response = await api.get(`/api/users/${username}`);
  return response.data;
};
