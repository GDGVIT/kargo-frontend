"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Branding from "./Branding/Branding";
import { FiBarChart2, FiKey, FiShield } from "react-icons/fi";
import { FaDocker } from "react-icons/fa";
import { useAuth } from "../Auth/AuthProvider/AuthProvider";

export default function Sidebar() {
  const { user, loading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!user) {
      setIsAdmin(false);
      return;
    }
    setIsAdmin(user.role === "admin" || user.role === "superadmin");
  }, [user]);

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: <FiBarChart2 /> },
    { href: "/dockerize", label: "Dockerize", icon: <FaDocker /> },
    { href: "/credentials", label: "Credentials", icon: <FiKey /> },
    ...(isAdmin
      ? [{ href: "/admin", label: "Admin", icon: <FiShield />, admin: true }]
      : []),
  ];

  if (loading || !user) return null;

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
              className={`flex items-center gap-3 px-3 py-2 text-sm rounded-md transition
                ${
                  admin
                    ? "text-amber-400 hover:bg-amber-500/20 hover:text-white"
                    : "text-[var(--foreground)] hover:bg-[var(--background)]/70 hover:text-[var(--text-link-hover-color)]"
                }
              `}
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
