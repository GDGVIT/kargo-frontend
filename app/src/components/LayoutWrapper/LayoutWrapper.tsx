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
        "m-0": !isMobile && user,
        "mx-[var(--screen-horizontal-margin)]": isMobile || !user,
        "md:ml-52": !isMobile && user, // Add left margin for desktop when sidebar is visible
      })}
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        justifyContent: "space-between",
      }}
    >
      {children}
    </div>
  );
}
