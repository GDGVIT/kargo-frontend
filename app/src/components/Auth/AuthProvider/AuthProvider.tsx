"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { baseURL } from "../../../utils/api";
import Loader from "../../ui/Loader/Loader";
import type User from "../../../types/User/User";
import type AuthContextType from "../../../types/Auth/AuthContextType/AuthContextType";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

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

  const login = async (email: string, password: string, username?: string) => {
    const res = await fetch(`${baseURL}/api/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, username }),
    });

    const data = await res.json().catch(() => ({}));
    if (res.ok) {
      await refreshUser();
      return { success: true, message: data.message || "Login successful!" };
    }
    return { success: false, message: data.message || "Login failed." };
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

    const data = await res.json().catch(() => ({}));
    if (res.ok) {
      await refreshUser();
      return {
        success: true,
        message: data.message || "Registration successful!",
      };
    }
    return { success: false, message: data.message || "Registration failed." };
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
  };

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
