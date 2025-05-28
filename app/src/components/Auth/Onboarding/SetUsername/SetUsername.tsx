"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../AuthProvider/AuthProvider";

const SetUsername: React.FC = () => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { refreshUser } = useAuth();

  const usernameRegex = /^[A-Za-z0-9_-]+$/;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (
      !username ||
      typeof username !== "string" ||
      username.trim().length === 0 ||
      !usernameRegex.test(username) ||
      username.includes(" ")
    ) {
      setError(
        "Invalid username. Only alphabets, numbers, underscores, and hyphens are allowed. No spaces."
      );
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXTAUTH_URL}/api/auth/set-username`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username }),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Failed to set username");
      } else {
        await refreshUser();
        router.replace("/profile");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 rounded shadow bg-zinc-900 border border-zinc-800">
      <h2 className="text-2xl font-bold mb-4 text-zinc-100">
        Choose a Username
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          className="border border-zinc-700 bg-zinc-800 text-zinc-100 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-zinc-400"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        {error && <div className="text-red-400 text-sm">{error}</div>}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded disabled:opacity-50 transition-colors"
          disabled={loading}
        >
          {loading ? "Setting..." : "Set Username"}
        </button>
      </form>
    </div>
  );
};

export default SetUsername;
