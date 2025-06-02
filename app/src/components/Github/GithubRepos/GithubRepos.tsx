"use client";

import React, { useEffect, useState, useMemo } from "react";
import {
  FaGithub,
  FaLock,
  FaCodeBranch,
  FaStar,
  FaEye,
  FaExclamationCircle,
  FaUser,
} from "react-icons/fa";
import api from "../../../utils/api";
import axios from "axios";
import { useNotification } from "../../Notification/Notification";
import Loader from "../../Loader/Loader";
import { motion } from "framer-motion";
import gsap from "gsap";

export interface Repo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  private: boolean;
  fork: boolean;
  owner_login: string;
  forks_count: number;
  stargazers_count: number;
  watchers_count: number;
  language: string | null;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  license: string | null;
  open_issues_count: number;
}

const RepoListItem: React.FC<{ repo: Repo }> = ({ repo }) => {
  React.useEffect(() => {
    gsap.fromTo(
      `#repo-${repo.id}`,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
    );
  }, [repo.id]);

  return (
    <motion.li
      id={`repo-${repo.id}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring", bounce: 0.2 }}
      className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 py-3 border-b border-neutral-800 hover:bg-neutral-800/80 transition-colors group relative overflow-hidden"
      style={{ position: "relative" }}
    >
      <div>
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sky-400 font-semibold hover:underline flex items-center gap-2"
        >
          <FaGithub className="text-lg" />
          {repo.full_name}
        </a>
        <p className="text-sm text-zinc-400 mt-1 max-w-xl">
          {repo.description || <i>No description</i>}
        </p>
        <p className="text-xs text-zinc-400 mt-1 font-mono flex items-center gap-2">
          <FaUser className="inline-block mr-1" /> {repo.owner_login}
          {repo.private && (
            <span className="ml-2 px-2 py-0.5 bg-red-700 text-xs text-white rounded flex items-center gap-1">
              <FaLock /> Private
            </span>
          )}
          {repo.fork && (
            <span className="ml-2 px-2 py-0.5 bg-neutral-700 text-xs text-white rounded flex items-center gap-1">
              <FaCodeBranch /> Fork
            </span>
          )}
        </p>
      </div>
      <div className="mt-2 sm:mt-0 text-xs text-zinc-400 text-right min-w-[180px] font-mono flex flex-col gap-1">
        <div>
          Language:{" "}
          <span className="font-semibold text-white">
            {repo.language || "N/A"}
          </span>
        </div>
        <div className="flex gap-2 items-center justify-end">
          <span className="flex items-center gap-1">
            <FaStar /> {repo.stargazers_count}
          </span>
          <span className="flex items-center gap-1">
            <FaCodeBranch /> {repo.forks_count}
          </span>
        </div>
        <div className="flex gap-2 items-center justify-end">
          <span className="flex items-center gap-1">
            <FaEye /> {repo.watchers_count}
          </span>
          <span className="flex items-center gap-1">
            <FaExclamationCircle /> {repo.open_issues_count}
          </span>
        </div>
        <div>Created: {new Date(repo.created_at).toLocaleDateString()}</div>
      </div>

      <motion.div
        className="absolute inset-0 pointer-events-none bg-gradient-to-r from-sky-900/10 to-sky-400/10 opacity-0 group-hover:opacity-100 z-0"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.li>
  );
};

const RepoList: React.FC<{ repos: Repo[] }> = ({ repos }) => (
  <motion.ul
    className="divide-y divide-neutral-800 bg-neutral-950 rounded-lg shadow-inner mb-6  overflow-auto"
    style={{
      scrollbarWidth: "none",
      msOverflowStyle: "none",
    }}
    initial="hidden"
    animate="visible"
    variants={{
      hidden: {},
      visible: {
        transition: {
          staggerChildren: 0.07,
        },
      },
    }}
  >
    {repos.length === 0 ? (
      <motion.li
        className="text-center text-zinc-400 py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        No repositories found.
      </motion.li>
    ) : (
      repos.map((repo) => <RepoListItem key={repo.id} repo={repo} />)
    )}
  </motion.ul>
);

const RepoOwnerFilter: React.FC<{
  owners: string[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}> = ({ owners, value, onChange }) => (
  <div className="flex flex-col">
    <label
      htmlFor="repo-owner-filter"
      className="mb-1 text-sm font-medium text-zinc-300"
    >
      Repository owner filter
    </label>
    <motion.select
      className="bg-neutral-800 text-white px-3 py-2 rounded border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-sky-400 min-w-[140px] shadow-md"
      value={value}
      onChange={onChange}
      id="repo-owner-filter"
      name="repo-owner-filter"
      whileFocus={{ scale: 1.04, borderColor: "#38bdf8" }}
      whileHover={{ scale: 1.03, borderColor: "#38bdf8" }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {owners.map((owner) => (
        <option key={owner} value={owner}>
          {owner}
        </option>
      ))}
    </motion.select>
  </div>
);

const RepoPagination: React.FC<{
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}> = ({ page, totalPages, onPrev, onNext }) => (
  <motion.div
    className="flex justify-center items-center mt-4 space-x-4"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <motion.button
      className="px-4 py-2 rounded bg-neutral-800 text-white disabled:opacity-50 border border-neutral-700 shadow-md"
      onClick={onPrev}
      disabled={page === 1}
      aria-label="Previous page"
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05, backgroundColor: "#0ea5e9" }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      Previous
    </motion.button>
    <span
      className="text-zinc-300 font-semibold tracking-wide"
      aria-live="polite"
      aria-atomic="true"
    >
      Page {page} of {totalPages}
    </span>
    <motion.button
      className="px-4 py-2 rounded bg-neutral-800 text-white disabled:opacity-50 border border-neutral-700 shadow-md"
      onClick={onNext}
      disabled={page === totalPages || totalPages === 0}
      aria-label="Next page"
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05, backgroundColor: "#0ea5e9" }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      Next
    </motion.button>
  </motion.div>
);

const RepoSearchInput: React.FC<{
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ value, onChange }) => (
  <motion.input
    type="text"
    className="bg-neutral-800 text-white px-3 py-2 rounded border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-sky-400 w-full sm:w-64 shadow-md"
    placeholder="Search repositories..."
    value={value}
    onChange={onChange}
    aria-label="Search repositories"
    whileFocus={{ scale: 1.04, borderColor: "#38bdf8" }}
    whileHover={{ scale: 1.03, borderColor: "#38bdf8" }}
    transition={{ type: "spring", stiffness: 300 }}
  />
);

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
          const repos: Repo[] = res.data.repositories || [];
          for (const r of repos) {
            if (!repoIds.has(r.id)) {
              repoIds.add(r.id);
              combinedRepos.push(r);
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

  const handlePrevPage = () => setPage((p) => Math.max(1, p - 1));
  const handleNextPage = () => setPage((p) => Math.min(totalPages, p + 1));

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto mt-12 p-8  text-center text-red-500">
        <FaGithub className="mx-auto mb-2 text-3xl" />
        <div className="text-lg font-semibold mb-1">{error}</div>
      </div>
    );
  }

  if (installationIdsLoaded && installationIds.length === 0) {
    return (
      <div className="max-w-xl mx-auto mt-12 p-8  text-center text-zinc-400">
        <FaGithub className="mx-auto mb-2 text-3xl text-zinc-500" />
        <div className="text-lg font-semibold mb-1">GitHub not connected</div>
        <div className="text-sm">
          Please connect your GitHub on your profile page first.
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="mx-auto mt-12 p-8"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, type: "spring", bounce: 0.2 }}
    >
      <motion.div
        className="flex items-center mb-6"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <FaGithub className="text-2xl text-sky-400 mr-3 animate-pulse" />
        <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-sky-400 to-blue-600 bg-clip-text text-transparent">
          GitHub Repositories
        </h2>
      </motion.div>
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
    </motion.div>
  );
};

export default GithubRepos;
