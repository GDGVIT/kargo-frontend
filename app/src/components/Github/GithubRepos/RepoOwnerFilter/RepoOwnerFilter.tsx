import React from "react";

interface RepoOwnerFilterProps {
  owners: string[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const RepoOwnerFilter: React.FC<RepoOwnerFilterProps> = ({
  owners,
  value,
  onChange,
}) => (
  <select
    value={value}
    onChange={onChange}
    className="w-full sm:w-48 px-3 py-2 rounded border border-neutral-700 bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-sky-400"
    aria-label="Filter repositories by owner"
  >
    {owners.map((owner) => (
      <option key={owner} value={owner}>
        {owner}
      </option>
    ))}
  </select>
);

export default RepoOwnerFilter;
