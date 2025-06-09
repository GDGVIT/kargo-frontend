export default interface RepoOwnerFilterProps {
  owners: string[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
