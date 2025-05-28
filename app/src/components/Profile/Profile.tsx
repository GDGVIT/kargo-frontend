"use client";

import React from "react";
import { useAuth } from "../Auth/AuthProvider/AuthProvider";

const Profile: React.FC = () => {
  const { user, loading, logout } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>You are not logged in.</div>;

  return (
    <div>
      <h2>Profile</h2>
      <p>Email: {user.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Profile;
