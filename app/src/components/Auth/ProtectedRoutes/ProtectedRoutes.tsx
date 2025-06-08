"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "../AuthProvider/AuthProvider";
import Loader from "../../ui/Loader/Loader";

interface ProtectRoutesProps {
  children: React.ReactNode;
}

export default function ProtectRoutes({ children }: ProtectRoutesProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/auth");
    } else if (!loading && user && !user.username) {
      router.replace("/auth/onboarding");
    } else if (
      !loading &&
      user &&
      pathname.startsWith("/admin") &&
      user.role !== "admin" &&
      user.role !== "superadmin"
    ) {
      router.replace("/dashboard");
    }
  }, [loading, user, router, pathname]);

  if (loading || !user) {
    return <Loader />;
  }

  return <>{children}</>;
}
