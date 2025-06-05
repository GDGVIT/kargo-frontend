import React from "react";
import type { Application } from "../../types/Application";
import AppCard from "./AppCard";

interface AppListProps {
  applications: Application[];
  editId: string | null;
  editApp: Application;
  actionLoading: boolean;
  onEdit: (app: Application) => void;
  onDelete: (id: string) => void;
  onEditChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
}

const AppList: React.FC<AppListProps> = ({
  applications,
  editId,
  editApp,
  actionLoading,
  onEdit,
  onDelete,
  onEditChange,
  onSaveEdit,
  onCancelEdit,
}) => (
  <div className="grid gap-5">
    {applications.map((app) => (
      <AppCard
        key={app._id}
        app={app}
        editId={editId}
        editApp={editApp}
        actionLoading={actionLoading}
        onEdit={onEdit}
        onDelete={onDelete}
        onChange={onEditChange}
        onSave={onSaveEdit}
        onCancel={onCancelEdit}
      />
    ))}
  </div>
);

export default AppList;
