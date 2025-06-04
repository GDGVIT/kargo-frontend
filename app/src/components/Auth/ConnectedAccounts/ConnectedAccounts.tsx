"use client";

import React from "react";
import { FaGithub, FaGoogle, FaLock, FaCheckCircle } from "react-icons/fa";

interface ConnectedAccountsProps {
  hasGoogle: boolean;
  hasGitHubOAuth: boolean;
}

const ConnectedAccounts: React.FC<ConnectedAccountsProps> = ({
  hasGoogle,
  hasGitHubOAuth,
}) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

  return (
    <div className="w-full flex flex-col gap-6">
      <h2 className="text-xl font-semibold text-white mb-3 select-none">
        Connected Accounts (Authentication)
      </h2>

      {/* Email/Password */}
      <div className="flex items-center justify-between bg-neutral-800 border border-neutral-700 rounded-lg px-5 py-4">
        <div className="flex items-center gap-3">
          <FaLock className="text-sky-400" />
          <span className="text-white font-medium">Email / Password</span>
        </div>
        <span className="text-sm font-semibold text-emerald-400 select-none flex items-center gap-1">
          <FaCheckCircle className="text-emerald-400" /> Connected
        </span>
      </div>

      {/* Google OAuth */}
      <div className="flex items-center justify-between bg-neutral-800 border border-neutral-700 rounded-lg px-5 py-4">
        <div className="flex items-center gap-3">
          <FaGoogle className="text-sky-400" />
          <span className="text-white font-medium">Google</span>
        </div>
        {hasGoogle ? (
          <span className="text-sm font-semibold text-emerald-400 select-none flex items-center gap-1">
            <FaCheckCircle className="text-emerald-400" /> Connected
          </span>
        ) : (
          <button
            onClick={() => {
              window.location.href = `${apiUrl}/api/auth/google`;
            }}
            className="text-sm font-semibold text-sky-400 hover:underline focus:outline-none focus:ring-2 focus:ring-sky-400 rounded"
            type="button"
            aria-label="Connect Google Account"
          >
            Connect
          </button>
        )}
      </div>

      {/* GitHub OAuth */}
      <div className="flex items-center justify-between bg-neutral-800 border border-neutral-700 rounded-lg px-5 py-4">
        <div className="flex items-center gap-3">
          <FaGithub className="text-sky-400" />
          <span className="text-white font-medium">GitHub OAuth</span>
        </div>
        {hasGitHubOAuth ? (
          <span className="text-sm font-semibold text-emerald-400 select-none flex items-center gap-1">
            <FaCheckCircle className="text-emerald-400" /> Connected
          </span>
        ) : (
          <button
            onClick={() => {
              window.location.href = `${apiUrl}/api/auth/github`;
            }}
            className="text-sm font-semibold text-sky-400 hover:underline focus:outline-none focus:ring-2 focus:ring-sky-400 rounded"
            type="button"
            aria-label="Connect GitHub OAuth Account"
          >
            Connect
          </button>
        )}
      </div>
    </div>
  );
};

export default ConnectedAccounts;
