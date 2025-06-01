"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../../../utils/api";
import {
  NotificationProvider,
  useNotification,
} from "../../Notification/Notification";

interface Repo {
  id: number;
  name: string;
  html_url: string;
  private: boolean;
}

interface GithubRepoAPIResponse {
  id: number;
  name: string;
  html_url: string;
  private: boolean;
}

interface RepoListProps {
  repos: Repo[];
  loading: boolean;
  error: string | null;
}

function RepoList({ repos, loading, error }: RepoListProps) {
  if (loading)
    return <div className="text-zinc-300 mt-2">Loading repositories...</div>;
  if (error)
    return <div className="text-red-500 mt-2 font-semibold">{error}</div>;
  if (repos.length === 0)
    return <div className="text-zinc-400 mt-4">No repositories found.</div>;

  return (
    <ul className="mt-4 space-y-2">
      {repos.map((repo) => (
        <li
          key={repo.id}
          className="flex items-center justify-between bg-neutral-800 rounded-lg px-4 py-2"
        >
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-400 hover:underline"
          >
            {repo.name}
          </a>
          {repo.private && (
            <span className="ml-2 text-xs text-yellow-400 bg-yellow-900 rounded px-2 py-0.5">
              Private
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

const GithubRepos: React.FC = () => {
  const { notify } = useNotification();

  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(false);
  const [installationId, setInstallationId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const localInstallationId = localStorage.getItem("installation_id");
    if (localInstallationId) {
      setInstallationId(localInstallationId);
    }
  }, []);

  useEffect(() => {
    if (!installationId) {
      setRepos([]);
      setError(null);
      return;
    }

    const fetchRepos = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await api.get("/api/github/repos", {
          params: { installation_id: installationId },
          withCredentials: true,
        });

        const fetchedRepos: Repo[] = (res.data.repositories || []).map(
          (r: GithubRepoAPIResponse) => ({
            id: r.id,
            name: r.name,
            html_url: r.html_url,
            private: r.private,
          })
        );

        setRepos(fetchedRepos);
      } catch (err: unknown) {
        let message = "Failed to fetch GitHub repositories.";

        if (axios.isAxiosError(err)) {
          message = err.response?.data?.error || message;
        } else if (err instanceof Error) {
          message = err.message;
        }

        setError(message);
        setRepos([]);
        notify(message, "error");
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [installationId, notify]);

  if (!installationId) {
    return (
      <div className="max-w-xl mx-auto mt-8 p-6 bg-neutral-900 rounded-xl shadow-lg text-center text-zinc-400">
        Please connect your GitHub on your profile page first.
      </div>
    );
  }

  return (
    <NotificationProvider>
      <div className="max-w-xl mx-auto mt-8 p-6 bg-neutral-900 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-white">
          GitHub Repositories
        </h2>
        <RepoList repos={repos} loading={loading} error={error} />
      </div>
    </NotificationProvider>
  );
};

export default GithubRepos;
