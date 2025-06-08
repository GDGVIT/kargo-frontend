import React from "react";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLock,
  FaCodeBranch,
  FaStar,
  FaEye,
  FaExclamationCircle,
  FaUser,
} from "react-icons/fa";
import gsap from "gsap";
import Repo from "../../../../types/Repo/Repo";

const RepoListItem: React.FC<{ repo: Repo; actions?: React.ReactNode }> = ({
  repo,
  actions,
}) => {
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
        {actions && <div className="mt-2 flex justify-end">{actions}</div>}
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

export default RepoListItem;
