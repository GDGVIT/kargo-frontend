"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FaSignOutAlt,
  FaEnvelope,
  FaUser,
  FaUserCircle as FaUserIcon,
} from "react-icons/fa";

import { useAuth } from "../Auth/AuthProvider/AuthProvider";
import Loader from "../Loader/Loader";
import { useNotification } from "../Notification/Notification";
import GithubAuth from "../Github/GithubAuth/GithubAuth";
import PlanDetails from "./PlanDetails";

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

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center justify-center min-h-[60vh]"
      >
        <FaUserIcon className="text-7xl text-zinc-600 mb-5" />
        <div className="text-center py-8 text-gray-400 text-lg font-semibold">
          You are not logged in.
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="w-full max-w-3xl mx-auto mt-8 sm:mt-12 px-2 sm:px-8 py-6 bg-gradient-to-br from-neutral-900/90 via-neutral-950/80 to-zinc-900/80 rounded-3xl shadow-2xl border border-neutral-800 flex flex-col md:flex-row md:items-start md:gap-8 items-center gap-8 backdrop-blur-lg"
      style={{ boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.25)" }}
    >
      {/* Left: Avatar and Basic Info */}
      <div className="flex flex-col items-center md:items-start gap-4 w-full md:w-1/3">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
          className="relative"
        >
          <div className="bg-gradient-to-tr from-sky-700/40 via-zinc-800/80 to-sky-900/30 rounded-full p-2 shadow-lg">
            <FaUserIcon className="w-28 h-28 text-zinc-300 bg-zinc-800 rounded-full p-4 border-4 border-sky-700/40 shadow-xl transition-colors duration-300" />
          </div>
        </motion.div>
        <div className="flex flex-col items-center md:items-start gap-1 w-full">
          <div className="flex flex-wrap items-center gap-3 text-2xl font-bold text-white select-text drop-shadow-sm">
            <FaUser className="text-sky-400 animate-pulse" />
            <span className="truncate max-w-[220px]">{user.name}</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-zinc-300 text-base select-text">
            <FaEnvelope className="text-sky-400" />
            <span className="truncate max-w-[240px]">{user.email}</span>
          </div>
          {user.username && (
            <div className="flex flex-wrap items-center gap-2 text-zinc-400 text-base select-text">
              <FaUser className="text-sky-400" />@{user.username}
            </div>
          )}
        </div>
        <motion.button
          whileHover={{ scale: 1.07, backgroundColor: "#f43f5e" }}
          whileTap={{ scale: 0.97 }}
          onClick={handleLogout}
          className="flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-rose-600 via-rose-700 to-rose-800 hover:from-rose-500 hover:to-rose-700 text-white rounded-xl font-semibold shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rose-500 mt-2 w-full md:w-auto justify-center"
          aria-label="Logout"
        >
          <FaSignOutAlt className="text-xl animate-bounce" /> Logout
        </motion.button>
      </div>

      {/* Right: Details and Integrations */}
      <div className="flex flex-col gap-4 w-full md:w-2/3">
        {/* Plan Section */}
        {user.plan && (
          <PlanDetails
            planId={typeof user.plan === "string" ? user.plan : user.plan?._id}
          />
        )}
        {/* Resource Allocation Section */}
        {user.resources && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="w-full p-4 bg-gradient-to-br from-neutral-800/80 to-zinc-900/80 rounded-xl border border-neutral-700 shadow-md"
          >
            <div className="text-base font-semibold text-white mb-2 select-none">
              Resource Allocation
            </div>
            <div className="flex flex-col gap-1 text-sm text-zinc-300">
              {user.resources.requests && (
                <div>
                  <span className="font-medium text-zinc-400">Requests:</span>
                  <span className="ml-2">
                    CPU: {user.resources.requests.cpu || "-"} | Memory:{" "}
                    {user.resources.requests.memory || "-"}
                  </span>
                </div>
              )}
              {user.resources.limits && (
                <div>
                  <span className="font-medium text-zinc-400">Limits:</span>
                  <span className="ml-2">
                    CPU: {user.resources.limits.cpu || "-"} | Memory:{" "}
                    {user.resources.limits.memory || "-"}
                  </span>
                </div>
              )}
              {!user.resources.requests && !user.resources.limits && (
                <div className="text-zinc-500">No resource allocation set.</div>
              )}
            </div>
          </motion.div>
        )}
        {/* GitHub Integration */}

        <div className="rounded-xl bg-neutral-900/80 border border-sky-800 p-4 shadow-inner">
          <GithubAuth />
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
