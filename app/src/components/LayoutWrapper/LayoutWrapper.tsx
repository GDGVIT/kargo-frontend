"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useAuth } from "../Auth/AuthProvider/AuthProvider";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [pathname]);

  return (
    <div
      className={clsx("transition-all", {
        "ml-52": !isMobile && user, // Sidebar width only if sidebar is visible
        "ml-0": isMobile || !user,
      })}
    >
      <main>{children}</main>
    </div>
  );
}
