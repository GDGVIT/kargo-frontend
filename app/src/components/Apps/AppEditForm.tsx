import React, { useState } from "react";
import { Application } from "../../types/Application";

interface AppEditFormProps {
  app: Application;
  onChange: (app: Partial<Application>) => void;
  onSave: () => void;
  onCancel: () => void;
  loading: boolean;
}

const AppEditForm: React.FC<AppEditFormProps> = ({
  app,
  onChange,
  onSave,
  onCancel,
  loading,
}) => {
  const [volumesJson, setVolumesJson] = useState(
    app.volumes ? JSON.stringify(app.volumes, null, 2) : "[]"
  );
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "volumesJson") {
      setVolumesJson(value);
      try {
        const parsed = JSON.parse(value);
        onChange({ volumes: parsed });
      } catch {
        // ignore parse errors
      }
      return;
    }
    onChange({ [name]: value });
  };
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input
          className="input"
          placeholder="Namespace"
          name="namespace"
          value={app.namespace || ""}
          onChange={handleInputChange}
          disabled={loading}
        />
        <input
          className="input"
          placeholder="Deployment Name"
          name="deploymentName"
          value={app.deploymentName || ""}
          onChange={handleInputChange}
          disabled={loading}
        />
        <input
          className="input"
          placeholder="Service Name"
          name="serviceName"
          value={app.serviceName || ""}
          onChange={handleInputChange}
          disabled={loading}
        />
        <input
          className="input"
          placeholder="Ingress Host"
          name="ingressHost"
          value={app.ingressHost || ""}
          onChange={handleInputChange}
          disabled={loading}
        />
      </div>
      {/* Volumes Section */}
      <div className="col-span-2 mt-4">
        <textarea
          className="input"
          name="volumesJson"
          placeholder='[{"name":"my-secret","mountPath":"/etc/secret","type":"secret","secretName":"my-secret"}]'
          value={volumesJson}
          onChange={handleInputChange}
          disabled={loading}
          rows={3}
        />
      </div>
      <div className="flex gap-2 mt-4 justify-end">
        <button
          type="button"
          className="btn"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={onSave}
          disabled={loading}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AppEditForm;
