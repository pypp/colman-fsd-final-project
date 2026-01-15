import type { AuthTokens, UserProfile } from "@repo/types";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getUserByUsername } from "../api/user";

interface AuthContextType {
  user: UserProfile | null;
  tokens: AuthTokens | null;
  login: (user: UserProfile, tokens: AuthTokens) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [tokens, setTokens] = useState<AuthTokens | null>(() => {
    const savedRefresh = localStorage.getItem("refreshToken");
    return savedRefresh ? { accessToken: "", refreshToken: savedRefresh } : null;
  });

  const login = (userData: UserProfile, tokenData: AuthTokens) => {
    setUser(userData);
    setTokens(tokenData);
    localStorage.setItem("refreshToken", tokenData.refreshToken);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setTokens(null);
    localStorage.removeItem("user");
    localStorage.removeItem("refreshToken");
  };

  useEffect(() => {
    const syncUser = async () => {
      if (user?.username) {
        try {
          const freshUser = await getUserByUsername(user.username);
          setUser(freshUser);
        } catch (err) {
          console.error("Could not sync user data:", err);
        }
      }
    };
    syncUser();
  }, [user?.username]);

  return (
    <AuthContext.Provider value={{ user, tokens, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
