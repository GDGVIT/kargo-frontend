import React from "react";
import Input from "../../../ui/Input/Input";
import RepoSearchInputProps from "../../../../types/Repo/RepoSearchInputProps";

const RepoSearchInput: React.FC<RepoSearchInputProps> = ({
  value,
  onChange,
}) => (
  <Input
    type="text"
    placeholder="Search your repositories..."
    value={value}
    onChange={onChange}
    aria-label="Search your repositories"
  />
);

export default RepoSearchInput;
