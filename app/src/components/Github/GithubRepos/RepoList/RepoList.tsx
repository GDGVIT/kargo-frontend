import React from "react";
import { FaGithub } from "react-icons/fa";
import RepoListItem from "../RepoListItem/RepoListItem";

import type { Repo } from "../types";

interface RepoListProps {
  repos: Repo[];
}

const RepoList: React.FC<RepoListProps> = ({ repos }) => {
  if (repos.length === 0)
    return (
      <div className="flex items-center justify-center mt-6 text-zinc-400">
        <FaGithub className="mr-2" /> No repositories found.
      </div>
    );
  return (
    <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
      {repos.map((repo) => (
        <RepoListItem key={repo.id} repo={repo} />
      ))}
    </ul>
  );
};

export default RepoList;
