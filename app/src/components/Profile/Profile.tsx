"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaSignOutAlt,
  FaEnvelope,
  FaUser,
  FaUserCircle as FaUserIcon,
} from "react-icons/fa";

import { useAuth } from "../Auth/AuthProvider/AuthProvider";
import Loader from "../Loader/Loader";
import {
  NotificationProvider,
  useNotification,
} from "../Notification/Notification";
import GithubAuth from "../Github/GithubAuth/GithubAuth";

const Profile: React.FC = () => {
  const { user, loading, logout } = useAuth();
  const { notify } = useNotification();

  const handleLogout = async () => {
    try {
      await logout();
      notify("Logged out successfully!", "success");
    } catch {
      notify("Logout failed. Please try again.", "error");
    }
  };

  if (loading) return <Loader />;

  if (!user)
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center justify-center min-h-[60vh]"
      >
        <FaUserIcon className="text-6xl text-zinc-500 mb-4" />
        <div className="text-center py-8 text-gray-400 text-lg font-medium">
          You are not logged in.
        </div>
      </motion.div>
    );

  return (
    <NotificationProvider>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-lg mx-auto mt-12 p-8 bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-800 flex flex-col items-center gap-6"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
          className="relative"
        >
          <FaUserIcon className="w-24 h-24 text-zinc-500 bg-zinc-800 rounded-full p-3 border-4 border-zinc-700" />
        </motion.div>
        <div className="w-full flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 text-xl font-semibold text-white">
            <FaUser className="text-sky-400" />
            {user.name || <span className="text-zinc-400">No Name</span>}
          </div>
          <div className="flex items-center gap-2 text-zinc-300 text-base">
            <FaEnvelope className="text-sky-400" />
            {user.email}
          </div>
          {user.username && (
            <div className="flex items-center gap-2 text-zinc-400 text-base">
              <FaUser className="text-sky-400" />@{user.username}
            </div>
          )}
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className="flex items-center gap-2 px-5 py-2.5 mt-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg font-medium shadow transition-all"
        >
          <FaSignOutAlt className="text-lg" /> Logout
        </motion.button>
        <div className="w-full border-t border-neutral-800 my-4" />
        <div className="w-full flex flex-col items-center gap-3">
          <div className="flex items-center gap-2 text-lg font-medium text-white mb-2">
            <FaGithub className="text-sky-400 text-2xl" />
            GitHub Connection
          </div>
          <GithubAuth />
        </div>
      </motion.div>
    </NotificationProvider>
  );
};

export default Profile;
