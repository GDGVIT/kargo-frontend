"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../AuthProvider/AuthProvider";
import { motion } from "framer-motion";
import useNotification, {
  NotificationProvider,
} from "../../../ui/Notification/Notification";
import { baseURL } from "../../../../utils/api";

const SetUsername: React.FC = () => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { refreshUser } = useAuth();
  const { notify } = useNotification();

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
        "Invalid username. Only letters, numbers, underscores, and hyphens. No spaces."
      );
      notify(
        "Invalid username. Only letters, numbers, underscores, and hyphens. No spaces.",
        "warning"
      );
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${baseURL}/api/auth/set-username`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Failed to set username");
        notify(data.message || "Failed to set username", "error");
      } else {
        notify("Username set successfully!", "success");
        await refreshUser();
        router.replace("/profile");
      }
    } catch {
      setError("Something went wrong. Please try again.");
      notify("Something went wrong. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <NotificationProvider>
      <section className="flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md w-fullspace-y-5"
        >
          <h2 className="text-2xl font-bold text-center text-white">
            Choose a Username
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              className="bg-neutral-800 border border-neutral-700 text-white p-3 w-full rounded placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            {error && <div className="text-red-400 text-sm">{error}</div>}
            <button
              type="submit"
              className="w-full py-3 rounded-xl font-medium bg-white text-neutral-950 hover:bg-neutral-200 transition duration-300 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Setting..." : "Set Username"}
            </button>
          </form>
        </motion.div>
      </section>
    </NotificationProvider>
  );
};

export default SetUsername;
