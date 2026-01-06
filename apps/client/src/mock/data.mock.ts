import type { Post, UserProfile } from "../types";

export const mockUsers: UserProfile[] = [
  {
    id: "1",
    name: "Niv Naim",
    username: "niv",
    avatarUrl:
      "https://cultivatedculture.com/wp-content/uploads/2019/12/LinkedIn-Profile-Picture-Example-Rachel-Montan%CC%83ez.jpeg",
    bio: "Frontend developer · React · TypeScript · MUI",
  },
  {
    id: "2",
    name: "Netanel Henya",
    username: "netanel",
    avatarUrl:
      "https://cultivatedculture.com/wp-content/uploads/2019/12/LinkedIn-Profile-Picture-Example-Rachel-Montan%CC%83ez.jpeg",
    bio: "DevOps engineer · AWS · Docker · Kubernetes",
  },
];

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
  {
    id: "3",
    title: "Exploring TypeScript",
    body: "TypeScript has been a game-changer for my projects...",
    imageUrl: "https://picsum.photos/400/250?3",
    createdAt: "2025-01-03",
  },
  {
    id: "4",
    title: "Frontend Frameworks",
    body: "A comparison between React, Vue, and Angular...",
    imageUrl: "https://picsum.photos/400/250?4",
    createdAt: "2025-01-04",
  }
];
