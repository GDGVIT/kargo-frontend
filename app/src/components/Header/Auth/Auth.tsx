"use client";

import { useAuth } from "../../Auth/AuthProvider/AuthProvider";
import Loader from "../../Loader/Loader";

export default function Auth() {
  const { user, loading } = useAuth();

  if (loading) return <Loader />;

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <button
          onClick={() => (window.location.href = "/profile")}
          className="px-4 py-1.5 text-sm bg-green-600 hover:bg-green-500 text-white rounded-md transition"
        >
          Profile
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => (window.location.href = "/auth")}
      className="px-4 py-1.5 text-sm bg-blue-600 hover:bg-blue-500 text-white rounded-md transition"
    >
      Sign In
    </button>
  );
}
