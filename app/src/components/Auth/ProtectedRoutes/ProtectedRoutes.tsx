"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../AuthProvider/AuthProvider";
import Loader from "../../Loader/Loader";

interface ProtectRoutesProps {
  children: React.ReactNode;
}

export default function ProtectRoutes({ children }: ProtectRoutesProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/auth");
    } else if (!loading && user && !user.username) {
      router.replace("/auth/onboarding");
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return <Loader />;
  }

  return <>{children}</>;
}
