import { UserProfile } from "./user-profile.interface";

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface UserWithAuthTokens extends AuthTokens {
  user: UserProfile;
}
