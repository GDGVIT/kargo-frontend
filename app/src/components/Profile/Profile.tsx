"use client";

import React from "react";
import {
  FaSignOutAlt,
  FaEnvelope,
  FaUser,
  FaUserCircle as FaUserIcon,
} from "react-icons/fa";

import { useAuth } from "../Auth/AuthProvider/AuthProvider";
import Loader from "../ui/Loader/Loader";
import useNotification from "../ui/Notification/Notification";
import GithubAuth from "../Github/GithubAuth/GithubAuth";
import PlanDetails from "./PlanDetails";
import Card from "../ui/Card/Card";
import AnimatedButton from "../ui/AnimatedButton/AnimatedButton";

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
      <Card className="flex flex-col items-center justify-center min-h-[60vh]">
        <FaUserIcon className="text-7xl text-zinc-600 mb-5" />
        <div className="text-center py-8 text-gray-400 text-lg font-semibold">
          You are not logged in.
        </div>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto mt-8 sm:mt-12 px-2 sm:px-6 py-6 flex flex-col md:flex-row md:items-start md:gap-8 items-stretch gap-8">
      {/* Left: Avatar and Basic Info */}
      <Card className="flex flex-col items-center md:items-start gap-4 w-full md:w-1/3 min-w-[220px] max-w-full md:max-w-xs p-6">
        <div className="relative">
          <div>
            {user.profilePicture ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.profilePicture}
                alt="Profile"
                className="w-24 h-24 rounded-full"
              />
            ) : (
              <FaUserIcon className="w-24 h-24 text-zinc-300 bg-zinc-800 rounded-full p-4 border-4 border-sky-700/40 shadow transition-colors duration-300" />
            )}
          </div>
        </div>
        <div className="flex flex-col items-center md:items-start gap-1 w-full">
          <div className="flex flex-wrap items-center gap-3 text-xl font-bold text-white select-text w-full">
            <FaUser className="text-sky-400 flex-shrink-0" />
            <span
              className="break-words flex-1 min-w-0"
              style={{ wordBreak: "break-word" }}
            >
              {user.name}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-zinc-300 text-base select-text w-full">
            <FaEnvelope className="text-sky-400 flex-shrink-0" />
            <span
              className="break-words flex-1 min-w-0"
              style={{ wordBreak: "break-word" }}
            >
              {user.email}
            </span>
          </div>
          {user.username && (
            <div className="flex flex-wrap items-center gap-2 text-zinc-400 text-base select-text w-full">
              <FaUser className="text-sky-400 flex-shrink-0" />@{user.username}
            </div>
          )}
        </div>
        <AnimatedButton
          onClick={handleLogout}
          icon={<FaSignOutAlt className="text-lg" />}
          className="mt-2 w-full md:w-auto justify-center"
          variant="danger"
        >
          Logout
        </AnimatedButton>
      </Card>
      {/* Right: Details and Integrations */}
      <div className="flex flex-col gap-4 w-full md:w-2/3 justify-start">
        {/* Plan Section */}
        {user.plan && (
          <PlanDetails
            planId={typeof user.plan === "string" ? user.plan : user.plan?._id}
          />
        )}
        {/* GitHub Integration */}
        <Card className="p-4">
          <GithubAuth />
        </Card>
      </div>
    </div>
  );
};

export default Profile;
