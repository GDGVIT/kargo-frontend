import React from "react";
import Select from "../../../ui/Select/Select";
import RepoOwnerFilterProps from "../../../../types/Repo/RepoOwnerFilterProps";

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
    <Select
      value={value}
      onChange={onChange}
      options={owners.map((owner) => ({ value: owner, label: owner }))}
      id="repo-owner-filter"
      name="repo-owner-filter"
      className="bg-neutral-800 text-white px-3 py-2 rounded border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-sky-400 min-w-[140px] shadow-md"
    />
  </div>
);

export default RepoOwnerFilter;
