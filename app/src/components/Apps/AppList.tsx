import React from "react";
import { Application } from "../../types/Application";
import AppCard from "./AppCard";

interface AppListProps {
  applications: Application[];
  onEdit: (app: Application) => void;
  onDelete: (id: string) => void;
  loading: boolean;
}

const AppList: React.FC<AppListProps> = ({
  applications,
  onEdit,
  onDelete,
  loading,
}) => {
  if (applications.length === 0) {
    return (
      <div className="text-center text-zinc-400 py-12">
        No applications found.
      </div>
    );
  }
  return (
    <div className="grid gap-5">
      {applications.map((app) => (
        <AppCard
          key={app._id}
          app={app}
          onEdit={onEdit}
          onDelete={onDelete}
          loading={loading}
        />
      ))}
    </div>
  );
};

export default AppList;
