"use client";

import React, { useEffect, useState, useMemo } from "react";
import { FaGithub } from "react-icons/fa";
import api from "../../../utils/api";
import axios from "axios";
import { useNotification } from "../../Notification/Notification";
import Loader from "../../Loader/Loader";
import { motion } from "framer-motion";
import RepoPagination from "./RepoPagination/RepoPagination";
import RepoSearchInput from "./RepoSearchInput/RepoSearchInput";
import RepoOwnerFilter from "./RepoOwnerFilter/RepoOwnerFilter";
import RepoList from "./RepoList/RepoList";

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
  const [dockerModal, setDockerModal] = useState<{
    open: boolean;
    dockerfile?: string;
    dockerCompose?: string;
    repoName?: string;
  }>({
    open: false,
  });
  const [dockerizingRepoId, setDockerizingRepoId] = useState<number | null>(
    null
  );

  useEffect(() => {
    const fetchInstallationIds = async () => {
      try {
        const res = await api.get("/api/github/installation-id", {
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

  const handleDockerize = async (repo: Repo) => {
    setDockerizingRepoId(repo.id);
    try {
      notify(`Dockerizing ${repo.full_name}...`, "info");
      const res = await api.post("/api/applications/run-docker", {
        url: repo.html_url,
      });
      setDockerizingRepoId(null);
      if (res.data.dockerfile || res.data.dockerCompose) {
        setDockerModal({
          open: true,
          dockerfile: res.data.dockerfile,
          dockerCompose: res.data.dockerCompose,
          repoName: repo.full_name,
        });
      } else {
        notify("No Dockerfile or docker-compose.yml generated.", "warning");
      }
    } catch (err) {
      setDockerizingRepoId(null);
      let message = "Failed to dockerize repository.";
      if (axios.isAxiosError(err)) {
        message = err.response?.data?.error || message;
      } else if (err instanceof Error) {
        message = err.message;
      }
      notify(message, "error");
    }
  };

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
        <div className="text-xs text-orange-400 mt-4">
          If your repositories are not showing up but your account is connected,
          try uninstalling the GitHub app from your account first, then sign in
          again through the profile page.
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Docker Modal */}
      {dockerModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-neutral-900 rounded-lg shadow-lg p-6 max-w-2xl w-full relative">
            <button
              className="absolute top-2 right-2 text-zinc-400 hover:text-white text-xl"
              onClick={() => setDockerModal({ open: false })}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-lg font-bold mb-4 text-sky-400">
              Dockerization for {dockerModal.repoName}
            </h2>
            {dockerModal.dockerfile && (
              <div className="mb-4">
                <h3 className="font-semibold text-white mb-1">Dockerfile</h3>
                <pre className="bg-neutral-800 rounded p-3 text-sm overflow-x-auto text-green-200">
                  {dockerModal.dockerfile}
                </pre>
              </div>
            )}
            {dockerModal.dockerCompose && (
              <div>
                <h3 className="font-semibold text-white mb-1">
                  docker-compose.yml
                </h3>
                <pre className="bg-neutral-800 rounded p-3 text-sm overflow-x-auto text-yellow-200">
                  {dockerModal.dockerCompose}
                </pre>
              </div>
            )}
            {!dockerModal.dockerfile && !dockerModal.dockerCompose && (
              <div className="text-center text-red-400 mt-6">
                <p className="mb-2 font-semibold">
                  No Dockerfile or docker-compose.yml could be generated for
                  this repository.
                </p>
                <p className="text-xs text-zinc-400">
                  This may be due to an unsupported project structure or missing
                  configuration files in the repository.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Loader while dockerizing */}
      {dockerizingRepoId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-neutral-900 rounded-lg shadow-lg p-8 flex flex-col items-center">
            <Loader />
            <p className="mt-4 text-sky-300">
              Generating Dockerfile and docker-compose.yml...
              <br />
              This may take a minute or two for large repositories.
            </p>
          </div>
        </div>
      )}
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
        <div className="text-xs text-orange-400 mb-4">
          If your repositories are not showing up but your account is connected,
          try uninstalling the GitHub app from your account first, then sign in
          again through the profile page.
        </div>
        <RepoList
          repos={paginatedRepos}
          renderActions={(repo: Repo) => (
            <button
              className="px-3 py-1 bg-sky-700 hover:bg-sky-800 text-white rounded text-xs font-semibold mt-2"
              onClick={() => handleDockerize(repo)}
              disabled={!!dockerizingRepoId}
            >
              Dockerize
            </button>
          )}
        />
        <RepoPagination
          page={page}
          totalPages={totalPages}
          onPrev={handlePrevPage}
          onNext={handleNextPage}
        />
      </motion.div>
    </>
  );
};

export default GithubRepos;
