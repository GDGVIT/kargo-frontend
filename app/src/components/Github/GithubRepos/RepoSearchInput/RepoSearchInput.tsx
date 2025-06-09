import React from "react";
import { motion } from "framer-motion";
import RepoSearchInputProps from "../../../../types/Repo/RepoSearchInputProps";

const RepoSearchInput: React.FC<RepoSearchInputProps> = ({
  value,
  onChange,
}) => (
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

export default RepoSearchInput;
