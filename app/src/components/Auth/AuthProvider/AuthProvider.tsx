"use client";

// IMPORTANT: For authentication cookies to work:
// - Always use credentials: 'include' in fetch requests
// - Backend must set cookies with SameSite=None; Secure (for HTTPS/cross-origin)
// - Backend must set Access-Control-Allow-Credentials: true
// - Backend must set Access-Control-Allow-Origin to the exact frontend origin (not *)
// - baseURL must match the backend you are running (local/prod)

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Loader from "../../Loader/Loader";
import { baseURL } from "../../../utils/api";

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
      const res = await fetch(`${baseURL}/api/auth/me`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        let userObj = data.user;
        if (userObj && userObj._doc) {
          userObj = { ...userObj._doc, _id: userObj._id };
        }
        setUser(userObj);
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
    if (loading) return;

    if (!user) {
      if (!pathname.startsWith("/auth")) {
        router.replace("/auth");
      }
      return;
    }

    if (!user.username && pathname !== "/auth/onboarding") {
      router.replace("/auth/onboarding");
      return;
    }

    if (
      user.username &&
      pathname.startsWith("/auth") &&
      pathname !== "/auth/onboarding"
    ) {
      router.replace("/profile");
    }
  }, [loading, user, pathname, router]);

  const login = async (email: string, password: string, username?: string) => {
    const res = await fetch(`${baseURL}/api/auth/login`, {
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
    const res = await fetch(`${baseURL}/api/auth/register`, {
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
    await fetch(`${baseURL}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    setUser(null);

    if (typeof window !== "undefined") {
      localStorage.clear();
      sessionStorage.clear();
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });
    }

    router.replace("/auth");
  };

  if (typeof window !== "undefined" && typeof baseURL !== "undefined") {
    const frontendOrigin = window.location.origin;
    if (!baseURL.startsWith(frontendOrigin)) {
      console.warn(
        `WARNING: Frontend origin (${frontendOrigin}) does not match backend baseURL (${baseURL}).\nCookies may not be sent/received properly.\nEnsure CORS and cookie settings are correct on the backend.`
      );
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, refreshUser }}
    >
      {loading ? <Loader /> : children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
