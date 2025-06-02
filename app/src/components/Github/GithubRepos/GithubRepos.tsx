"use client";

import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import api from "../../../utils/api";
import { useNotification } from "../../Notification/Notification";
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
  owner_login: string;
}

interface GithubRepoAPIResponse {
  id: number;
  name: string;
  html_url: string;
  private: boolean;
  owner: {
    login: string;
  };
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
          <div className="mt-1 text-xs text-zinc-400">
            Owner: {repo.owner_login}
          </div>
        </li>
      ))}
    </ul>
  );
}

const GithubRepos: React.FC = () => {
  const { notify } = useNotification();

  const [installationIds, setInstallationIds] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const perPage = 10;

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOwner, setSelectedOwner] = useState<string>("All");

  const [allRepos, setAllRepos] = useState<Repo[]>([]);

  // Fetch installation IDs from backend on mount
  useEffect(() => {
    const fetchInstallationIds = async () => {
      try {
        const res = await api.get("/api/github/installation_id", {
          withCredentials: true,
        });

        const ids: string[] = res.data.installation_ids || [];

        if (ids.length === 0) {
          setError(
            "No GitHub installations found. Please connect your GitHub first."
          );
        }

        setInstallationIds(ids);
      } catch (err) {
        console.error("Failed to fetch installation IDs:", err);
        setError("Failed to fetch GitHub installation IDs.");
      }
    };

    fetchInstallationIds();
  }, []);

  // Fetch repos for all installation IDs when they change
  useEffect(() => {
    if (installationIds.length === 0) {
      setAllRepos([]);
      setLoading(false);
      return;
    }

    const fetchRepos = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch repos for each installation ID in parallel
        const repoResponses = await Promise.all(
          installationIds.map((id) =>
            api.get("/api/github/repos", {
              params: { installation_id: id },
              withCredentials: true,
            })
          )
        );

        // Combine repos from all responses and dedupe by repo id
        const combinedRepos: Repo[] = [];
        const repoIds = new Set<number>();

        for (const res of repoResponses) {
          const repos: GithubRepoAPIResponse[] = res.data.repositories || [];

          for (const r of repos) {
            if (!repoIds.has(r.id)) {
              repoIds.add(r.id);
              combinedRepos.push({
                id: r.id,
                name: r.name,
                html_url: r.html_url,
                private: r.private,
                owner_login: r.owner.login,
              });
            }
          }
        }

        setAllRepos(combinedRepos);
        setPage(1);
      } catch (err: unknown) {
        let message = "Failed to fetch GitHub repositories.";

        if (axios.isAxiosError(err)) {
          message = err.response?.data?.error || message;
        } else if (err instanceof Error) {
          message = err.message;
        }

        setError(message);
        setAllRepos([]);
        notify(message, "error");
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [installationIds, notify]);

  const filteredRepos = useMemo(() => {
    let filtered = allRepos;

    if (selectedOwner !== "All") {
      filtered = filtered.filter((r) => r.owner_login === selectedOwner);
    }

    if (searchTerm.trim()) {
      filtered = filtered.filter((r) =>
        r.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [allRepos, searchTerm, selectedOwner]);

  const totalPages = Math.ceil(filteredRepos.length / perPage);
  const paginatedRepos = filteredRepos.slice(
    (page - 1) * perPage,
    page * perPage
  );

  const owners = useMemo(() => {
    const ownerSet = new Set(allRepos.map((r) => r.owner_login));
    return ["All", ...Array.from(ownerSet).sort()];
  }, [allRepos]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const handleOwnerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOwner(e.target.value);
    setPage(1);
  };

  const handlePrevPage = () => {
    setPage((p) => Math.max(1, p - 1));
  };

  const handleNextPage = () => {
    setPage((p) => Math.min(totalPages, p + 1));
  };

  if (error) {
    return (
      <div className="max-w-xl mx-auto mt-12 p-8 bg-neutral-900 rounded-xl shadow-lg text-center text-red-500 border border-red-600">
        <FaGithub className="mx-auto mb-2 text-3xl" />
        <div className="text-lg font-semibold mb-1">{error}</div>
      </div>
    );
  }

  if (installationIds.length === 0) {
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
    <div className="mx-auto mt-12 p-8 bg-neutral-900 rounded-xl shadow-lg border border-neutral-700 max-w-4xl">
      <div className="flex items-center mb-6">
        <FaGithub className="text-2xl text-sky-400 mr-3" />
        <h2 className="text-2xl font-bold text-white tracking-tight">
          GitHub Repositories
        </h2>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
        <input
          type="text"
          placeholder="Search repositories..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full sm:w-64 px-3 py-2 rounded border border-neutral-700 bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-sky-400"
          autoComplete="off"
        />
        <select
          value={selectedOwner}
          onChange={handleOwnerChange}
          className="w-full sm:w-48 px-3 py-2 rounded border border-neutral-700 bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-sky-400"
          aria-label="Filter repositories by owner"
        >
          {owners.map((owner) => (
            <option key={owner} value={owner}>
              {owner}
            </option>
          ))}
        </select>
      </div>

      <RepoList repos={paginatedRepos} loading={loading} error={error} />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-4">
          <button
            onClick={handlePrevPage}
            disabled={page === 1}
            className="px-4 py-2 rounded bg-sky-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="text-white pt-2">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={page === totalPages}
            className="px-4 py-2 rounded bg-sky-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default GithubRepos;
