"use client";

import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();

  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-[var(--background)] py-12">
      <div className="bg-[var(--card-background)] shadow-xl rounded-2xl p-10 w-full max-w-md flex flex-col items-center gap-8 border border-[#23283a]">
        <h1 className="text-3xl font-bold mb-2 text-[var(--foreground)] tracking-tight">
          Admin Dashboard
        </h1>
        <div className="flex flex-col gap-6 w-full">
          <button
            type="button"
            className="w-full px-6 py-4 bg-[var(--theme-blue)] text-[var(--background)] rounded-lg text-lg font-semibold shadow hover:bg-cyan-400 hover:scale-[1.03] active:scale-100 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            onClick={() => router.push("/admin/users")}
          >
            <span className="flex items-center justify-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M16 7a4 4 0 11-8 0 4 4 0 018 0zm6 13a9 9 0 10-18 0h18z"
                />
              </svg>
              Manage Users
            </span>
          </button>
          <button
            type="button"
            className="w-full px-6 py-4 bg-[#3a4152] text-[var(--foreground)] rounded-lg text-lg font-semibold shadow hover:bg-[#23283a] hover:scale-[1.03] active:scale-100 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[var(--theme-blue)]"
            onClick={() => router.push("/admin/plans")}
          >
            <span className="flex items-center justify-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 10c-4.41 0-8-1.79-8-4V6c0-2.21 3.59-4 8-4s8 1.79 8 4v8c0 2.21-3.59 4-8 4z"
                />
              </svg>
              Manage Plans
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
