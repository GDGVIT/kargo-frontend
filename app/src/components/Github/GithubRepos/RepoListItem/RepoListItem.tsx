import React from "react";
import {
  FaGithub,
  FaLock,
  FaCodeBranch,
  FaStar,
  FaEye,
  FaExclamationCircle,
  FaUser,
} from "react-icons/fa";
import Repo from "../../../../types/Repo/Repo";
import Card from "../../../ui/Card/Card";

const RepoListItem: React.FC<{ repo: Repo; actions?: React.ReactNode }> = ({
  repo,
  actions,
}) => {
  return (
    <Card className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 py-3 group relative overflow-hidden">
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
        {actions && <div className="mt-2 flex justify-end">{actions}</div>}
      </div>
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-sky-900/10 to-sky-400/10 opacity-0 group-hover:opacity-100 z-0 transition-opacity duration-300" />
    </Card>
  );
};

export default RepoListItem;
