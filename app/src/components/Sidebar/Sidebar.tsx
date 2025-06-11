"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Branding from "./Branding/Branding";
import { FiBarChart2, FiKey, FiShield, FiUser } from "react-icons/fi";
import { FaDocker } from "react-icons/fa";
import { useAuth } from "../Auth/AuthProvider/AuthProvider";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Sidebar() {
  const { user, loading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!user) {
      setIsAdmin(false);
      return;
    }
    setIsAdmin(user.role === "admin" || user.role === "superadmin");
  }, [user]);

  const navItems = [
    { href: "/applications", label: "Applications", icon: <FiBarChart2 /> },
    { href: "/dockerize", label: "Dockerize", icon: <FaDocker /> },
    { href: "/credentials", label: "Credentials", icon: <FiKey /> },
    ...(isAdmin
      ? [{ href: "/admin", label: "Admin", icon: <FiShield />, admin: true }]
      : []),
    { href: "/profile", label: "Profile", icon: <FiUser /> },
  ];

  if (loading || !user) return null;

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <AnimatePresence>
        {user && (
          <motion.aside
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -60, opacity: 0 }}
            transition={{ type: "tween", duration: 0.8, ease: "easeInOut" }}
            className="hidden md:flex fixed top-0 left-0 z-40 h-full w-52 bg-[#242837] border-r border-[#2C313F] shadow-sm flex-col px-4 py-6"
          >
            <Branding />
            <nav className="mt-8 flex flex-col space-y-4">
              {navItems.map(({ href, label, icon, admin }) => {
                // Allow nested route highlighting
                const isActive =
                  href === "/" ? pathname === href : pathname.startsWith(href);
                return (
                  <Link
                    key={label}
                    href={href}
                    className={`sidebar-link flex items-center gap-3 px-3 py-2 text-sm rounded-md transition
                      ${
                        isActive
                          ? "bg-gray-700 text-white"
                          : admin
                          ? "text-amber-400 hover:bg-amber-500/20 hover:text-white"
                          : "text-white"
                      }
                      hover:bg-gray-700 hover:text-white
                    `}
                    style={
                      !isActive && !admin
                        ? { opacity: 0.7 }
                        : !isActive && admin
                        ? { opacity: 0.7 }
                        : undefined
                    }
                  >
                    <span className="text-lg">{icon}</span>
                    <span>{label}</span>
                  </Link>
                );
              })}
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* MOBILE BOTTOM NAV */}
      <AnimatePresence>
        {user && (
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#242837] border-t border-[#2C313F] flex h-14"
          >
            {navItems.map(({ href, icon, label }) => {
              const isActive =
                href === "/" ? pathname === href : pathname.startsWith(href);
              return (
                <Link
                  key={label}
                  href={href}
                  className={`flex-1 flex items-center justify-center h-full text-2xl text-white ${
                    isActive ? "bg-gray-700" : "hover:bg-gray-700"
                  }`}
                  style={!isActive ? { opacity: 0.7 } : undefined}
                >
                  {icon}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
