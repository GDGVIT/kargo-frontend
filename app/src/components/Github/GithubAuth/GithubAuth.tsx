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
  const [installationIds, setInstallationIds] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAndSyncInstallationIds = async () => {
      try {
        const res = await api.get("/api/github/installation_id", {
          withCredentials: true,
        });

        const savedInstallationIds: string[] = res.data.installation_ids || [];

        // IDs from URL param or sessionStorage
        const url = new URL(window.location.href);
        const paramId = url.searchParams.get("installation_id");
        const sessionId = sessionStorage.getItem("installation_ids");
        let idsFromClient: string[] = [];

        if (paramId) idsFromClient.push(paramId);
        else if (sessionId) idsFromClient = JSON.parse(sessionId);

        // Merge existing and new installation IDs uniquely
        const allInstallationIds = Array.from(
          new Set([...savedInstallationIds, ...idsFromClient])
        );

        // Find new IDs that are not saved yet in backend
        const newIdsToSave = allInstallationIds.filter(
          (id) => !savedInstallationIds.includes(id)
        );

        // Save any new installation IDs to backend
        for (const id of newIdsToSave) {
          await api.post(
            "/api/github/installation-id",
            { installation_id: id },
            { withCredentials: true }
          );
        }

        // Update local state and sessionStorage with merged unique IDs
        setInstallationIds(allInstallationIds);
        sessionStorage.setItem(
          "installation_ids",
          JSON.stringify(allInstallationIds)
        );

        // Remove installation_id from URL if present
        if (paramId) {
          url.searchParams.delete("installation_id");
          window.history.replaceState(null, "", url.toString());
        }
      } catch (err) {
        console.error("Error loading GitHub installation IDs:", err);
        setError("Failed to load GitHub installation info.");
      }
    };

    fetchAndSyncInstallationIds();
  }, []);

  const isConnected = installationIds.length > 0;

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-neutral-900 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-white">
        {isConnected ? "GitHub Connected" : "Connect GitHub"}
      </h2>
      {error && <p className="mb-4 text-red-500 font-medium">{error}</p>}
      {isConnected ? (
        <>
          <p className="text-zinc-400 mb-4">
            GitHub connected with {installationIds.length} installation
            {installationIds.length > 1 ? "s" : ""}.
            <br />
            <a
              href="/dashboard"
              className="text-sky-400 underline hover:text-sky-300"
            >
              Go to dashboard
            </a>
            .
          </p>
          <ReinstallButton />
        </>
      ) : (
        <InstallButton />
      )}
    </div>
  );
};

export default GithubAuth;
