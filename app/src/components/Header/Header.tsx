"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Auth from "./Auth/Auth";

const Header: React.FC = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  return (
    <header
      className="border-b-2 border-[#2c313f] flex items-center justify-between px-6 fixed top-0 left-[200px] right-0 z-50 bg-[var(--background)]"
      style={{ height: "64px" }}
    >
      <h2 className="text-xl font-bold tracking-tight flex items-center">
        <span className="text-[#9DA3B3] text-base font-normal">Kargo</span>
        <span className="text-zinc-100 text-base font-normal flex items-center">
          {pathSegments.map((segment, idx) => (
            <React.Fragment key={idx}>
              <span className="mx-1">/</span>
              {segment}
            </React.Fragment>
          ))}
        </span>
      </h2>
      <Auth />
    </header>
  );
};

export default Header;
