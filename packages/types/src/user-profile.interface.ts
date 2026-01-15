export interface UserProfile {
  id?: string;
  name: string;
  username: string;
  email: string;
  avatarUrl?: string;
  bio?: string;
}

export interface RegisterDTO extends Omit<UserProfile, "id"> {
  password: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface LogoutDTO {
  email: string;
  refreshToken: string;
}
