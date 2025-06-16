"use client";

import React from "react";
import Auth from "./Auth/Auth";
import { useAuth } from "../../Auth/AuthProvider/AuthProvider";
import Link from "next/link";
import Breadcrumbs from "./Breadcrumbs/Breadcrumbs";

const HEADER_HEIGHT = 64;

const Header: React.FC = () => {
  const { user } = useAuth();

  const headerClass = `
    fixed top-0 right-0
    border-b-2 border-[#2c313f]
    flex items-center justify-between
    bg-[var(--background)]/50 backdrop-blur-sm
    pl-6
    h-[64px]
    w-full
    z-50
    left-0
    ${user ? "md:w-[calc(100%-208px)] md:left-[208px] md:z-30" : ""}
  `;

  return (
    <header className={headerClass} style={{ height: HEADER_HEIGHT }}>
      <h2
        className="text-xl font-bold tracking-tight flex items-center overflow-hidden whitespace-nowrap h-full"
        style={{ margin: 0 }}
      >
        <Link href="/">
          <span
            className="text-[#9DA3B3] text-base font-normal select-none mr-1 pl-5 flex items-center h-full"
            style={{ letterSpacing: "1px" }}
          >
            Kargo
          </span>
        </Link>
        <Breadcrumbs />
      </h2>
      <div className="flex items-center h-full">
        <Auth />
      </div>
    </header>
  );
};

export default Header;
