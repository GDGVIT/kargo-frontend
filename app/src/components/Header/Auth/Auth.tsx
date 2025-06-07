"use client";

import { useAuth } from "../../Auth/AuthProvider/AuthProvider";
import Loader from "../../Loader/Loader";

export default function Auth() {
  const { user, loading } = useAuth();

  if (loading) return <Loader />;

  if (user) {
    return (
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => (window.location.href = "/profile")}
      >
        {user.profilePicture && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.profilePicture}
            alt={user.name || user.username || "User"}
            className="w-8 h-8 rounded-full object-cover border border-gray-300"
          />
        )}
        <span className="text-sm font-medium">
          {user.name || user.username || user.email}
        </span>
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
