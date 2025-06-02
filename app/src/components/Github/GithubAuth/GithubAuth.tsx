"use client";

import React, { useEffect, useState } from "react";
import api, { baseURL } from "../../../utils/api";

function InstallButton() {
  return (
    <a
      href={`${baseURL}/api/github/install`}
      target="_blank"
      rel="noopener noreferrer"
      className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg font-medium inline-block text-center"
    >
      Connect GitHub
    </a>
  );
}

function ReinstallButton() {
  return (
    <a
      href={`${baseURL}/api/github/install`}
      target="_blank"
      rel="noopener noreferrer"
      className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg font-medium inline-block text-center"
    >
      Reinstall GitHub App
    </a>
  );
}

const GithubAuth: React.FC = () => {
  const [installationId, setInstallationId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSavedInstallationId = async () => {
      try {
        const res = await api.get("/api/github/installation_id", {
          withCredentials: true,
        });

        const savedInstallationId = res.data.installation_id;

        if (savedInstallationId) {
          setInstallationId(savedInstallationId);
          localStorage.setItem("installation_id", savedInstallationId);
          return;
        }

        const url = new URL(window.location.href);
        const paramInstallationId = url.searchParams.get("installation_id");
        const localInstallationId = localStorage.getItem("installation_id");

        const installationIdToUse = paramInstallationId || localInstallationId;

        if (installationIdToUse) {
          setInstallationId(installationIdToUse);
          localStorage.setItem("installation_id", installationIdToUse);

          // Save installation ID to backend
          await api.post(
            "/api/github/installation-id",
            { installation_id: installationIdToUse },
            { withCredentials: true }
          );

          // Remove installation_id from URL params
          if (paramInstallationId) {
            url.searchParams.delete("installation_id");
            window.history.replaceState(null, "", url.toString());
          }
        }
      } catch (err) {
        console.error("Error saving installation ID:", err);
        setError("Failed to load GitHub installation info.");
      }
    };

    fetchSavedInstallationId();
  }, []);

  if (installationId) {
    return (
      <div className="max-w-xl mx-auto mt-8 p-6 bg-neutral-900 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-white">GitHub Connected</h2>
        <p className="text-zinc-400">
          GitHub connected.{" "}
          <a
            href="/dashboard"
            className="text-sky-400 underline hover:text-sky-300"
          >
            Go to dashboard
          </a>
          .
        </p>
        <ReinstallButton />
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-neutral-900 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-white">Connect GitHub</h2>
      {error && <p className="mb-4 text-red-500 font-medium">{error}</p>}
      <InstallButton />
    </div>
  );
};

export default GithubAuth;
