import React from "react";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaLock,
  FaLockOpen,
} from "react-icons/fa";
import type { Repo } from "../types";

interface RepoListItemProps {
  repo: Repo;
}

const RepoListItem: React.FC<RepoListItemProps> = ({ repo }) => {
  return (
    <li className="flex flex-col bg-neutral-800 rounded-lg px-4 py-3 shadow hover:shadow-lg transition-shadow border border-neutral-700">
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
  );
};

export default RepoListItem;
