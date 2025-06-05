import React from "react";
import { FaSave, FaTimes } from "react-icons/fa";
import type { Application } from "../../types/Application";

interface AppFormProps {
  app: Partial<Application>;
  actionLoading: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  onCancel: () => void;
  isEdit?: boolean;
}

const AppForm: React.FC<AppFormProps> = ({
  app,
  actionLoading,
  onChange,
  onSave,
  onCancel,
  isEdit = false,
}) => (
  <div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <input
        className="input"
        placeholder="Name"
        name="name"
        value={app.name || ""}
        onChange={onChange}
        disabled={actionLoading}
      />
      <input
        className="input"
        placeholder="Image URL"
        name="imageUrl"
        value={app.imageUrl || ""}
        onChange={onChange}
        disabled={actionLoading}
      />
      <input
        className="input"
        placeholder="Image Tag"
        name="imageTag"
        value={app.imageTag || ""}
        onChange={onChange}
        disabled={actionLoading}
      />
      <input
        className="input"
        placeholder="Registry Token"
        name="registryToken"
        value={app.registryToken || ""}
        onChange={onChange}
        disabled={actionLoading}
      />
      <input
        className="input"
        placeholder="Namespace"
        name="namespace"
        value={app.namespace || ""}
        onChange={onChange}
        disabled={actionLoading}
      />
      <input
        className="input"
        placeholder="Deployment Name"
        name="deploymentName"
        value={app.deploymentName || ""}
        onChange={onChange}
        disabled={actionLoading}
      />
      <input
        className="input"
        placeholder="Service Name"
        name="serviceName"
        value={app.serviceName || ""}
        onChange={onChange}
        disabled={actionLoading}
      />
      <input
        className="input"
        placeholder="Ingress Host"
        name="ingressHost"
        value={app.ingressHost || ""}
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
        <FaSave /> {isEdit ? "Save" : "Add"}
      </button>
      <button
        className="px-4 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded shadow-sm flex items-center gap-2 text-sm"
        onClick={onCancel}
        disabled={actionLoading}
      >
        <FaTimes /> Cancel
      </button>
    </div>
  </div>
);

export default AppForm;
