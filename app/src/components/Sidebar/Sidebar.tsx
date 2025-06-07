"use client";

import { useEffect, useState } from "react";
import Branding from "./Branding/Branding";
import Link from "next/link";
import axios from "../../utils/api";

export default function Sidebar() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axios.get("/api/auth/me");
        if (
          res.data?.user?.role === "admin" ||
          res.data?.user?.role === "superadmin"
        ) {
          setIsAdmin(true);
        }
      } catch {
        setIsAdmin(false);
      }
    }
    fetchUser();
  }, []);

  return (
    <aside className="fixed top-0 left-0 z-50 w-64 max-w-[200px] h-full bg-[#242837] border-r-2 border-[#2C313F] shadow-sm flex flex-col justify-between px-4 py-6">
      <div>
        <Branding />
        <nav className="flex flex-col mt-8 space-y-2">
          <Link
            href="/dashboard"
            className="px-3 py-2 text-sm text-zinc-300 hover:text-white transition rounded-md hover:bg-zinc-800"
          >
            Dashboard
          </Link>
          <Link
            href="/dockerize"
            className="px-3 py-2 text-sm text-zinc-300 hover:text-white transition rounded-md hover:bg-zinc-800"
          >
            Dockerize
          </Link>
          {isAdmin && (
            <Link
              href="/admin"
              className="px-3 py-2 text-sm text-amber-400 hover:text-white transition rounded-md hover:bg-amber-500/20"
            >
              Admin
            </Link>
          )}
        </nav>
      </div>
    </aside>
  );
}
