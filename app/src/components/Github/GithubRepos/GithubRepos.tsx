"use client";

import React, { useEffect, useState, useMemo } from "react";
import { FaGithub } from "react-icons/fa";
import api from "../../../utils/api";
import axios from "axios";
import { useNotification } from "../../Notification/Notification";
import Loader from "../../Loader/Loader";

// --- Repo type (from types.ts) ---
export interface Repo {
  id: number;
  name: string;
  html_url: string;
  private: boolean;
  owner_login: string;
}

// --- RepoListItem component ---
const RepoListItem: React.FC<{ repo: Repo }> = ({ repo }) => (
  <li className="flex items-center justify-between px-4 py-3 border-b border-neutral-800 hover:bg-neutral-800 transition-colors">
    <div className="flex flex-col">
      <a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sky-400 font-semibold hover:underline"
      >
        {repo.name}
      </a>
      <span className="text-xs text-zinc-400 mt-1">
        Owner:{" "}
        <span className="font-mono text-zinc-300">{repo.owner_login}</span>
        {repo.private && (
          <span className="ml-2 px-2 py-0.5 bg-red-700 text-xs text-white rounded">
            Private
          </span>
        )}
      </span>
    </div>
    <FaGithub className="text-xl text-zinc-500 ml-2" />
  </li>
);

// --- RepoList component ---
const RepoList: React.FC<{ repos: Repo[] }> = ({ repos }) => (
  <ul className="divide-y divide-neutral-800 bg-neutral-950 rounded-lg shadow-inner mb-6">
    {repos.length === 0 ? (
      <li className="text-center text-zinc-400 py-8">No repositories found.</li>
    ) : (
      repos.map((repo) => <RepoListItem key={repo.id} repo={repo} />)
    )}
  </ul>
);

// --- RepoOwnerFilter component ---
const RepoOwnerFilter: React.FC<{
  owners: string[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}> = ({ owners, value, onChange }) => (
  <select
    className="bg-neutral-800 text-white px-3 py-2 rounded border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-sky-400 min-w-[120px]"
    value={value}
    onChange={onChange}
    aria-label="Filter repositories by owner"
  >
    {owners.map((owner) => (
      <option key={owner} value={owner}>
        {owner}
      </option>
    ))}
  </select>
);

// --- RepoPagination component ---
const RepoPagination: React.FC<{
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}> = ({ page, totalPages, onPrev, onNext }) => (
  <div className="flex justify-center items-center mt-4 space-x-4">
    <button
      className="px-4 py-2 rounded bg-neutral-800 text-white disabled:opacity-50 border border-neutral-700"
      onClick={onPrev}
      disabled={page === 1}
    >
      Previous
    </button>
    <span className="text-zinc-300">
      Page {page} of {totalPages}
    </span>
    <button
      className="px-4 py-2 rounded bg-neutral-800 text-white disabled:opacity-50 border border-neutral-700"
      onClick={onNext}
      disabled={page === totalPages || totalPages === 0}
    >
      Next
    </button>
  </div>
);

// --- RepoSearchInput component ---
const RepoSearchInput: React.FC<{
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ value, onChange }) => (
  <input
    type="text"
    className="bg-neutral-800 text-white px-3 py-2 rounded border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-sky-400 w-full sm:w-64"
    placeholder="Search repositories..."
    value={value}
    onChange={onChange}
  />
);

// --- Main GithubRepos component ---
interface GithubRepoAPIResponse {
  id: number;
  name: string;
  html_url: string;
  private: boolean;
  owner: {
    login: string;
  };
}

const GithubRepos: React.FC = () => {
  const { notify } = useNotification();

  const [installationIds, setInstallationIds] = useState<string[]>([]);
  const [installationIdsLoaded, setInstallationIdsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const perPage = 10;

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOwner, setSelectedOwner] = useState<string>("All");

  const [allRepos, setAllRepos] = useState<Repo[]>([]);

  useEffect(() => {
    const fetchInstallationIds = async () => {
      try {
        const res = await api.get("/api/github/installation_id", {
          withCredentials: true,
        });
        const ids: string[] = res.data.installation_ids || [];
        setInstallationIds(ids);
      } catch (err) {
        console.error("Failed to fetch installation IDs:", err);
        setError("Failed to fetch GitHub installation IDs.");
        setInstallationIds([]);
      } finally {
        setInstallationIdsLoaded(true);
      }
    };

    fetchInstallationIds();
  }, []);

  useEffect(() => {
    if (!installationIdsLoaded) return;
    if (installationIds.length === 0) {
      setAllRepos([]);
      setLoading(false);
      return;
    }
    const fetchRepos = async () => {
      setLoading(true);
      setError(null);
      try {
        const repoResponses = await Promise.all(
          installationIds.map((id) =>
            api.get("/api/github/repos", {
              params: { installation_id: id },
              withCredentials: true,
            })
          )
        );
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
  }, [installationIds, installationIdsLoaded, notify]);

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

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto mt-12 p-8 bg-neutral-900 rounded-xl shadow-lg text-center text-red-500 border border-red-600">
        <FaGithub className="mx-auto mb-2 text-3xl" />
        <div className="text-lg font-semibold mb-1">{error}</div>
      </div>
    );
  }

  if (installationIdsLoaded && installationIds.length === 0) {
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
        <RepoSearchInput value={searchTerm} onChange={handleSearchChange} />
        <RepoOwnerFilter
          owners={owners}
          value={selectedOwner}
          onChange={handleOwnerChange}
        />
      </div>
      <RepoList repos={paginatedRepos} />
      <RepoPagination
        page={page}
        totalPages={totalPages}
        onPrev={handlePrevPage}
        onNext={handleNextPage}
      />
    </div>
  );
};

export default GithubRepos;
