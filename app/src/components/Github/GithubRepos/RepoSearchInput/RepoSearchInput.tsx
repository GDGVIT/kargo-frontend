import React from "react";

interface RepoSearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RepoSearchInput: React.FC<RepoSearchInputProps> = ({
  value,
  onChange,
}) => (
  <input
    type="text"
    placeholder="Search repositories..."
    value={value}
    onChange={onChange}
    className="w-full sm:w-64 px-3 py-2 rounded border border-neutral-700 bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-sky-400"
    autoComplete="off"
  />
);

export default RepoSearchInput;
