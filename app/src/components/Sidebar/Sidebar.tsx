"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Branding from "./Branding/Branding";
import axios from "../../utils/api";
import { FiHome, FiServer, FiUser } from "react-icons/fi";

export default function Sidebar() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axios.get("/api/auth/me");
        const role = res.data?.user?.role;
        setIsAdmin(role === "admin" || role === "superadmin");
      } catch {
        setIsAdmin(false);
      }
    }
    fetchUser();
  }, []);

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: <FiHome /> },
    { href: "/dockerize", label: "Dockerize", icon: <FiServer /> },
    ...(isAdmin
      ? [{ href: "/admin", label: "Admin", icon: <FiUser />, admin: true }]
      : []),
  ];

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex fixed top-0 left-0 z-40 h-full w-52 bg-[#242837] border-r border-[#2C313F] shadow-sm flex-col px-4 py-6">
        <Branding />
        <nav className="mt-8 flex flex-col space-y-2">
          {navItems.map(({ href, label, icon, admin }) => (
            <Link
              key={label}
              href={href}
              className={`flex items-center gap-3 px-3 py-2 text-sm rounded-md transition ${
                admin
                  ? "text-amber-400 hover:bg-amber-500/20 hover:text-white"
                  : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
              }`}
            >
              <span className="text-lg">{icon}</span>
              <span>{label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* MOBILE BOTTOM NAV */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#242837] border-t border-[#2C313F] flex justify-around items-center px-4 py-3">
        {navItems.map(({ href, icon, label }) => (
          <Link
            key={label}
            href={href}
            className="text-zinc-300 hover:text-white text-2xl"
          >
            {icon}
          </Link>
        ))}
      </div>
    </>
  );
}
