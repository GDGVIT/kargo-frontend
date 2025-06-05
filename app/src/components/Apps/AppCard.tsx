import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import type { Application } from "../../types/Application";

interface AppCardProps {
  app: Application;
  editId: string | null;
  editApp: Application;
  actionLoading: boolean;
  onEdit: (app: Application) => void;
  onDelete: (id: string) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  onCancel: () => void;
}

const AppCard: React.FC<AppCardProps> = ({
  app,
  editId,
  editApp,
  actionLoading,
  onEdit,
  onDelete,
  onChange,
  onSave,
  onCancel,
}) => {
  return (
    <div className="rounded-xl bg-white/5 shadow border border-neutral-200 dark:border-neutral-700 p-5 hover:shadow-md transition-all group">
      {editId === app._id ? (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              className="input"
              placeholder="Name"
              title="Name"
              name="name"
              value={editApp.name}
              onChange={onChange}
              disabled={actionLoading}
            />
            <input
              className="input"
              placeholder="Image URL"
              title="Image URL"
              name="imageUrl"
              value={editApp.imageUrl}
              onChange={onChange}
              disabled={actionLoading}
            />
            <input
              className="input"
              placeholder="Image Tag"
              title="Image Tag"
              name="imageTag"
              value={editApp.imageTag}
              onChange={onChange}
              disabled={actionLoading}
            />
            <input
              className="input"
              placeholder="Registry Token"
              title="Registry Token"
              name="registryToken"
              value={editApp.registryToken}
              onChange={onChange}
              disabled={actionLoading}
            />
            <input
              className="input"
              placeholder="Namespace"
              title="Namespace"
              name="namespace"
              value={editApp.namespace}
              onChange={onChange}
              disabled={actionLoading}
            />
            <input
              className="input"
              placeholder="Deployment Name"
              title="Deployment Name"
              name="deploymentName"
              value={editApp.deploymentName}
              onChange={onChange}
              disabled={actionLoading}
            />
            <input
              className="input"
              placeholder="Service Name"
              title="Service Name"
              name="serviceName"
              value={editApp.serviceName}
              onChange={onChange}
              disabled={actionLoading}
            />
            <input
              className="input"
              placeholder="Ingress Host"
              title="Ingress Host"
              name="ingressHost"
              value={editApp.ingressHost}
              onChange={onChange}
              disabled={actionLoading}
            />
          </div>
          <div className="flex gap-2 mt-4 justify-end">
            <button
              className="px-4 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded shadow-sm flex items-center gap-2 text-sm"
              onClick={onSave}
              disabled={actionLoading}
            >
              Save
            </button>
            <button
              className="px-4 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded shadow-sm flex items-center gap-2 text-sm"
              onClick={onCancel}
              disabled={actionLoading}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>
            <div className="text-lg font-semibold mb-1">{app.name}</div>
            <div className="text-xs text-zinc-400 mb-1">
              {app.imageUrl}:{app.imageTag}
            </div>
            <div className="text-xs text-zinc-500">
              Namespace: {app.namespace || "default"}
            </div>
          </div>
          <div className="flex flex-col gap-0.5 mt-2 md:mt-0 text-xs text-zinc-400">
            <span>Deployment: {app.deploymentName || "-"}</span>
            <span>Service: {app.serviceName || "-"}</span>
            <span>Ingress: {app.ingressHost || "-"}</span>
          </div>
          <div className="flex gap-2 mt-2 md:mt-0">
            <button
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded shadow-sm flex items-center gap-2 text-sm"
              onClick={() => onEdit(app)}
              disabled={actionLoading}
            >
              <FaEdit /> Edit
            </button>
            <button
              className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded shadow-sm flex items-center gap-2 text-sm"
              onClick={() => onDelete(app._id)}
              disabled={actionLoading}
            >
              <FaTrash /> Delete
            </button>
          </div>
        </div>
      )}
      <div className="mt-3 text-xs text-zinc-500 text-right">
        Last updated: {new Date(app.updatedAt).toLocaleString()}
      </div>
    </div>
  );
};

export default AppCard;
