"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Auth from "./Auth/Auth";
import { useAuth } from "../Auth/AuthProvider/AuthProvider";
import Link from "next/link";

const HEADER_HEIGHT = 64;

const Header: React.FC = () => {
  const { user } = useAuth();
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  const headerClass = `
    fixed top-0 right-0
    border-b-2 border-[#2c313f]
    flex items-center justify-between
    bg-[var(--background)]/50 backdrop-blur-sm
    px-6
    h-[64px]
    w-full
    z-50
    left-0
    ${user ? "md:w-[calc(100%-208px)] md:left-[208px] md:z-30" : ""}
  `;

  return (
    <header className={headerClass} style={{ height: HEADER_HEIGHT }}>
      <h2 className="text-xl font-bold tracking-tight flex items-center overflow-hidden whitespace-nowrap">
        <Link href="/">
          <span className="text-[#9DA3B3] text-base font-normal select-none mr-1 pl-5">
            Kargo
          </span>
        </Link>
        <span className="hidden md:flex text-zinc-100 text-base font-normal items-center gap-1 overflow-hidden">
          {pathSegments.map((segment, idx) => (
            <React.Fragment key={idx}>
              <span className="mx-1 select-none">/</span>
              <span className="truncate">{segment}</span>
            </React.Fragment>
          ))}
        </span>
      </h2>
      <Auth />
    </header>
  );
};

export default Header;
