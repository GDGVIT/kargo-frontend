"use client";

import React from "react";
import Image from "next/image";
import { useAuth } from "../Auth/AuthProvider/AuthProvider";

const Profile: React.FC = () => {
  const { user, loading, logout } = useAuth();

  if (loading)
    return <div className="text-center py-8 text-gray-200">Loading...</div>;
  if (!user)
    return (
      <div className="text-center py-8 text-gray-200">
        You are not logged in.
      </div>
    );

  return (
    <div className="max-w-md mx-auto bg-gray-900 rounded-lg shadow-md p-8 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-100">
        Profile
      </h2>
      <div className="flex flex-col items-center">
        {user.profilePicture && (
          <div className="mb-4">
            <Image
              src={user.profilePicture}
              alt="Profile"
              width={100}
              height={100}
              className="rounded-full object-cover border-4 border-gray-700"
            />
          </div>
        )}
        <div className="w-full">
          <p className="mb-2 text-gray-200">
            <span className="font-semibold text-gray-300">Name:</span>{" "}
            {user.name}
          </p>
          <p className="mb-2 text-gray-200">
            <span className="font-semibold text-gray-300">Email:</span>{" "}
            {user.email}
          </p>
          <p className="mb-2 text-gray-200">
            <span className="font-semibold text-gray-300">Username:</span>{" "}
            {user.username || "N/A"}
          </p>
        </div>
        <button
          onClick={logout}
          className="mt-4 px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
