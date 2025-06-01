"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../../../utils/api";
import {
  NotificationProvider,
  useNotification,
} from "../../Notification/Notification";
import {
  FaLock,
  FaLockOpen,
  FaExternalLinkAlt,
  FaGithub,
} from "react-icons/fa";

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
    return (
      <div className="flex items-center justify-center mt-6 text-zinc-300">
        <svg
          className="animate-spin h-5 w-5 mr-2 text-sky-400"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8z"
          />
        </svg>
        Loading repositories...
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center mt-6 text-red-500 font-semibold">
        <FaGithub className="mr-2" /> {error}
      </div>
    );
  if (repos.length === 0)
    return (
      <div className="flex items-center justify-center mt-6 text-zinc-400">
        <FaGithub className="mr-2" /> No repositories found.
      </div>
    );

  return (
    <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
      {repos.map((repo) => (
        <li
          key={repo.id}
          className="flex flex-col bg-neutral-800 rounded-lg px-4 py-3 shadow hover:shadow-lg transition-shadow border border-neutral-700"
        >
          <div className="flex items-center justify-between">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400 font-medium text-lg hover:underline flex items-center truncate"
              title={repo.name}
            >
              <FaGithub className="mr-2" />
              <span className="truncate">{repo.name}</span>
              <FaExternalLinkAlt className="ml-2 text-xs opacity-70" />
            </a>
            {repo.private ? (
              <span
                className="ml-2 flex items-center text-xs text-yellow-400 bg-yellow-900 rounded px-2 py-0.5"
                title="Private repository"
              >
                <FaLock className="mr-1" /> Private
              </span>
            ) : (
              <span
                className="ml-2 flex items-center text-xs text-green-400 bg-green-900 rounded px-2 py-0.5"
                title="Public repository"
              >
                <FaLockOpen className="mr-1" /> Public
              </span>
            )}
          </div>
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
      <div className="max-w-xl mx-auto mt-12 p-8 bg-neutral-900 rounded-xl shadow-lg text-center text-zinc-400 border border-neutral-700">
        <FaGithub className="mx-auto mb-2 text-3xl text-zinc-500" />
        <div className="text-lg font-semibold mb-1">GitHub not connected</div>
        <div className="text-sm">
          Please connect your GitHub on your profile page first.
        </div>
      </div>
    );
  }

  return (
    <NotificationProvider>
      <div className="mx-auto mt-12 p-8 bg-neutral-900 rounded-xl shadow-lg border border-neutral-700">
        <div className="flex items-center mb-6">
          <FaGithub className="text-2xl text-sky-400 mr-3" />
          <h2 className="text-2xl font-bold text-white tracking-tight">
            GitHub Repositories
          </h2>
        </div>
        <RepoList repos={repos} loading={loading} error={error} />
      </div>
    </NotificationProvider>
  );
};

export default GithubRepos;
