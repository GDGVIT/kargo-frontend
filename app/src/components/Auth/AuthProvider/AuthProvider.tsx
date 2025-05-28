"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

interface User {
  name: string;
  _id: string;
  email: string;
  username?: string;
  profilePicture?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (
    email: string,
    password: string,
    username?: string
  ) => Promise<boolean>;
  register: (
    email: string,
    password: string,
    name?: string,
    username?: string
  ) => Promise<boolean>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const refreshUser = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/me`, {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        let userObj = data.user;
        if (userObj && userObj._doc) {
          userObj = { ...userObj._doc, _id: userObj._id };
        }
        setUser(userObj);
        console.log("User data:", userObj);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  useEffect(() => {
    if (!loading && user) {
      if (!user.username && pathname !== "/auth/onboarding") {
        router.replace("/auth/onboarding");
      } else if (user.username && pathname.startsWith("/auth")) {
        router.replace("/profile");
      }
    }
  }, [loading, user, pathname, router]);

  const login = async (email: string, password: string, username?: string) => {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, username }),
    });

    if (res.ok) {
      await refreshUser();
      return true;
    }
    return false;
  };

  const register = async (
    email: string,
    password: string,
    name?: string,
    username?: string
  ) => {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/register`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name, username }),
    });

    if (res.ok) {
      await refreshUser();
      return true;
    }
    return false;
  };

  const logout = async () => {
    await fetch(`${process.env.NEXTAUTH_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
    router.replace("/auth");
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
