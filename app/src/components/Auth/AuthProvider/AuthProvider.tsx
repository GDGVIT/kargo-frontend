"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface User {
  _id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/me`, {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        // Handle _doc structure from backend
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

  const login = async (email: string, password: string) => {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      await refreshUser();
      return true;
    }
    return false;
  };

  const register = async (email: string, password: string) => {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/register`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
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
