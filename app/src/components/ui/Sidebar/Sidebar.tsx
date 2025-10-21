'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBarChart2, FiBook, FiKey, FiSettings, FiShield } from 'react-icons/fi';
import { useAuth } from '@/components/Auth/AuthProvider/AuthProvider';
import Branding from './Branding/Branding';

export default function Sidebar() {
  const { user, loading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!user) {
      setIsAdmin(false);
      return;
    }
    setIsAdmin(user.role === 'admin' || user.role === 'superadmin');
  }, [user]);

  const navItems = [
    { href: '/applications', label: 'Applications', icon: <FiBarChart2 /> },
    { href: '/logs', label: 'Logs', icon: <FiBook /> },
    { href: '/credentials', label: 'Credentials', icon: <FiKey /> },
    // { href: "/plans", label: "Plans", icon: <FiGrid /> },
    { href: '/settings', label: 'Settings', icon: <FiSettings /> },
    ...(isAdmin ? [{ href: '/admin', label: 'Admin', icon: <FiShield />, admin: true }] : []),
  ];

  if (loading || !user) return null;

  function DesktopSidebar() {
    return (
      <AnimatePresence>
        {user && (
          <motion.aside
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -60, opacity: 0 }}
            transition={{ type: 'tween', duration: 0.8, ease: 'easeInOut' }}
            className="hidden md:flex fixed top-0 left-0 z-40 h-full w-52 bg-[#242837] border-r border-[#2C313F] shadow-sm flex-col px-4 py-2"
          >
            <Branding />
            <nav className="mt-8 flex flex-col space-y-4">
              {navItems.map(({ href, label, icon, admin }) => {
                const isActive = href === '/' ? pathname === href : pathname.startsWith(href);
                return (
                  <Link
                    key={label}
                    href={href}
                    className={`sidebar-link flex items-center gap-3 px-3 py-2 text-sm rounded-md transition
                      ${
                        isActive
                          ? 'bg-gray-700 text-white'
                          : admin
                            ? 'text-amber-400 hover:bg-amber-500/20 hover:text-white'
                            : 'text-white'
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
    );
  }

  function MobileBottomNav() {
    return (
      <AnimatePresence>
        {user && (
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#242837] border-t border-[#2C313F] flex h-18"
          >
            {navItems.map(({ href, icon, label }) => {
              const isActive = href === '/' ? pathname === href : pathname.startsWith(href);
              return (
                <Link
                  key={label}
                  href={href}
                  className={`flex-1 flex items-center justify-center h-full text-2xl ${
                    isActive ? 'bg-gray-700' : 'hover:bg-gray-700'
                  }`}
                  style={!isActive ? { opacity: 0.7 } : undefined}
                >
                  <span className="text-white mb-2">{icon}</span>
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <DesktopSidebar />

      {/* MOBILE BOTTOM NAV */}
      <MobileBottomNav />
    </>
  );
}
