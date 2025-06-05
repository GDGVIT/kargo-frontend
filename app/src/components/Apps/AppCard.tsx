import React from "react";
import { Application } from "../../types/Application";

interface AppCardProps {
  app: Application;
  onEdit: (app: Application) => void;
  onDelete: (id: string) => void;
  loading: boolean;
}

const AppCard: React.FC<AppCardProps> = ({
  app,
  onEdit,
  onDelete,
  loading,
}) => {
  return (
    <div className="rounded-xl bg-white/5 shadow border border-neutral-200 dark:border-neutral-700 p-5 hover:shadow-md transition-all group">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div>
          <div className="font-semibold text-lg">{app.name}</div>
          <div className="text-xs text-zinc-500">
            {app.imageUrl}:{app.imageTag}
          </div>
          <div className="text-xs text-zinc-500">
            Namespace: {app.namespace}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            className="btn btn-sm"
            onClick={() => onEdit(app)}
            disabled={loading}
          >
            Edit
          </button>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => onDelete(app._id)}
            disabled={loading}
          >
            Delete
          </button>
        </div>
      </div>
      <div className="mt-3 text-xs text-zinc-500 text-right">
        Last updated:{" "}
        {app.updatedAt ? new Date(app.updatedAt).toLocaleString() : "-"}
      </div>
    </div>
  );
};

export default AppCard;
