"use client";

import { useAuth } from "../../Auth/AuthProvider/AuthProvider";
import Loader from "../../ui/Loader/Loader";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Auth() {
  const { user, loading, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  if (loading) return <Loader />;

  if (user) {
    return (
      <div className="relative" ref={dropdownRef} style={{ height: "100%" }}>
        <div
          className="flex items-center gap-2 cursor-pointer px-2 hover:bg-[#11131887] transition h-full"
          onClick={() => (window.location.href = "/profile")}
        >
          {user.profilePicture && !imageError && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.profilePicture}
              alt={user.name || user.username || "User"}
              className="w-8 h-8 rounded-full object-cover border border-gray-300"
              onError={() => setImageError(true)}
            />
          )}
          <span className="text-sm font-medium block whitespace-nowrap">
            {user.name || user.username || user.email}
          </span>
          <span
            className="ml-1 flex items-center justify-center w-7 h-7 rounded-full hover:bg-[#23283a] transition"
            onClick={(e) => {
              e.stopPropagation();
              setOpen((v) => !v);
            }}
            tabIndex={0}
            aria-label="Open user menu"
            role="button"
          >
            <motion.svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              animate={{ rotate: open ? 180 : 0, scale: open ? 1.2 : 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{ display: "block" }}
            >
              <motion.path
                d="M6 10L12 16L18 10"
                stroke="#9DA3B3"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={false}
                animate={{
                  stroke: open ? "#fff" : "#9DA3B3",
                }}
                transition={{ duration: 0.2 }}
              />
            </motion.svg>
          </span>
        </div>
        <AnimatePresence>
          {open ? (
            <motion.div
              key="dropdown"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.18 }}
              className="absolute right-0 mt-2 w-52 min-w-[160px] max-w-[90vw] bg-[#2f3646] border border-[#3a4152] rounded-xl shadow-lg z-50 p-4 flex flex-col gap-2"
              style={{
                color: "var(--foreground)",
                boxShadow: "var(--box-shadow-default)",
              }}
            >
              <div className="mb-2 flex flex-col gap-1">
                <div className="font-semibold text-white text-base break-all">
                  @{user.username || "-"}
                </div>
                <div className="text-xs text-gray-300 break-all">
                  {user.email}
                </div>
              </div>
              <button
                onClick={async () => {
                  setOpen(false);
                  await logout();
                  window.location.href = "/auth";
                }}
                className="w-full px-4 py-2 text-sm bg-[#23283a] hover:bg-[#293040] text-red-400 hover:text-red-300 rounded-md transition border border-[#3a4152]"
              >
                Logout
              </button>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <button
      onClick={() => (window.location.href = "/auth")}
      className="px-4 py-1.5 text-sm rounded-md transition"
    >
      Sign In
    </button>
  );
}
