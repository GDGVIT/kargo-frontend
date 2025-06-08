import React from "react";
import { motion } from "framer-motion";
import RepoOwnerFilterProps from "../../../../types/RepoOwnerFilterProps";

const RepoOwnerFilter: React.FC<RepoOwnerFilterProps> = ({
  owners,
  value,
  onChange,
}) => (
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

export default RepoOwnerFilter;
