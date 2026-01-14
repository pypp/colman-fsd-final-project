export interface UserProfile {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  avatarUrl: string;
  bio: string;
  tokens?: string[];
}
