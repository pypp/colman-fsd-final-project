import type { Post, User } from "../types";

export const mockUser: User = {
  id: "1",
  name: "John Doe",
  username: "johndoe",
  avatarUrl: "https://i.pravatar.cc/150?img=3",
};

export const mockPosts: Post[] = [
  {
    id: "1",
    title: "My first post",
    body: "This is a short preview of the post content...",
    imageUrl: "https://picsum.photos/400/250?1",
    createdAt: "2025-01-01",
  },
  {
    id: "2",
    title: "Another day",
    body: "Sharing some thoughts about today...",
    imageUrl: "https://picsum.photos/400/250?2",
    createdAt: "2025-01-02",
  },
];
