"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../Auth/AuthProvider/AuthProvider";
import Loader from "../Loader/Loader";
import { useNotification } from "../Notification/Notification";

const Profile: React.FC = () => {
  const { user, loading, logout } = useAuth();
  const { notify } = useNotification();

  const [imgError, setImgError] = useState(false);

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
      <div className="text-center py-8 text-gray-400">
        You are not logged in.
      </div>
    );

  return (
    <div className="max-w-md mx-auto bg-gray-800 rounded-md shadow-md p-8 mt-8">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-200">
        Profile
      </h2>
      <div className="flex flex-col items-center">
        <div className="mb-6">
          {user.profilePicture && !imgError ? (
            <Image
              src={user.profilePicture}
              alt="Profile"
              width={100}
              height={100}
              className="rounded-full object-cover border-2 border-gray-600"
              onError={() => setImgError(true)}
              unoptimized
            />
          ) : (
            <FaUserCircle className="text-gray-500" size={100} />
          )}
        </div>
        <div className="w-full text-gray-300">
          <p className="mb-3">
            <span className="font-medium text-gray-400">Name:</span> {user.name}
          </p>
          <p className="mb-3">
            <span className="font-medium text-gray-400">Email:</span>{" "}
            {user.email}
          </p>
          <p className="mb-3">
            <span className="font-medium text-gray-400">Username:</span>{" "}
            {user.username || "N/A"}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="mt-6 px-6 py-2 bg-red-700 text-white rounded-md hover:bg-red-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
