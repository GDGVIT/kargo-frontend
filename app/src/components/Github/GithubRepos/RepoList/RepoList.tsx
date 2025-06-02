import React from "react";
import { motion } from "framer-motion";
import RepoListItem from "../RepoListItem/RepoListItem";
import { Repo } from "../GithubRepos";

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

export default RepoList;
