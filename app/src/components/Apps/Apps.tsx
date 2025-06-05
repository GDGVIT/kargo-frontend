"use client";

import React, { useEffect, useState } from "react";
import axios from "../../utils/api";
import type { AxiosError } from "axios";
import { useAuth } from "../Auth/AuthProvider/AuthProvider";
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";
import type { Application } from "../../types/Application";

const emptyApp: Partial<Application> = {
  _id: "",
  name: "",
  imageUrl: "",
  imageTag: "latest",
  registryToken: "",
  env: {},
  createdAt: "",
  updatedAt: "",
  namespace: "",
  deploymentName: "",
  serviceName: "",
  ingressHost: "",
  resources: undefined,
  ports: undefined,
  volumes: undefined,
  ingress: undefined,
  livenessProbe: undefined,
  readinessProbe: undefined,
  command: undefined,
  args: undefined,
  labels: undefined,
  annotations: undefined,
  nodeSelector: undefined,
  tolerations: undefined,
  affinity: undefined,
};

const DashboardPage: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [newApp, setNewApp] = useState({ ...emptyApp });
  const [editId, setEditId] = useState<string | null>(null);
  const [editApp, setEditApp] = useState({ ...emptyApp });
  const [actionLoading, setActionLoading] = useState(false);

  // Fetch applications
  const fetchApplications = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("/api/applications");
      setApplications(res.data.applications);
    } catch (err) {
      const error = err as AxiosError;
      setError(
        error.response?.data &&
          typeof error.response.data === "object" &&
          "message" in error.response.data
          ? (error.response.data as { message: string }).message
          : typeof error.message === "string"
          ? error.message
          : "Unknown error"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && user) {
      fetchApplications();
    }
  }, [authLoading, user]);

  // Add Application
  const handleAdd = async () => {
    setActionLoading(true);
    setError(null);
    try {
      await axios.post("/api/applications", newApp);
      setShowAdd(false);
      setNewApp({ ...emptyApp });
      fetchApplications();
    } catch (err) {
      const error = err as AxiosError;
      setError(
        error.response?.data &&
          typeof error.response.data === "object" &&
          "message" in error.response.data
          ? (error.response.data as { message: string }).message
          : typeof error.message === "string"
          ? error.message
          : "Unknown error"
      );
    } finally {
      setActionLoading(false);
    }
  };

  // Delete Application
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this application?"))
      return;
    setActionLoading(true);
    setError(null);
    try {
      await axios.delete(`/api/applications/${id}`);
      fetchApplications();
    } catch (err) {
      const error = err as AxiosError;
      setError(
        error.response?.data &&
          typeof error.response.data === "object" &&
          "message" in error.response.data
          ? (error.response.data as { message: string }).message
          : typeof error.message === "string"
          ? error.message
          : "Unknown error"
      );
    } finally {
      setActionLoading(false);
    }
  };

  // Edit Application
  const handleEdit = (app: Application) => {
    setEditId(app._id);
    setEditApp({ ...app });
  };

  // Save Edit
  const handleSaveEdit = async () => {
    if (!editId) return;
    setActionLoading(true);
    setError(null);
    try {
      await axios.put(`/api/applications/${editId}`, editApp);
      setEditId(null);
      fetchApplications();
    } catch (err) {
      const error = err as AxiosError;
      setError(
        error.response?.data &&
          typeof error.response.data === "object" &&
          "message" in error.response.data
          ? (error.response.data as { message: string }).message
          : typeof error.message === "string"
          ? error.message
          : "Unknown error"
      );
    } finally {
      setActionLoading(false);
    }
  };

  // Cancel Edit
  const handleCancelEdit = () => {
    setEditId(null);
  };

  // Handle input change for add/edit forms
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    // Only check for 'checked' if input is checkbox
    const checked =
      type === "checkbox" && "checked" in e.target
        ? (e.target as HTMLInputElement).checked
        : undefined;

    // Handle nested fields for resources and ingress
    if (name.startsWith("resources.")) {
      const [, section, field] = name.split(".");
      if (section === "requests" || section === "limits") {
        if (editId) {
          setEditApp((prev) => ({
            ...prev,
            resources: {
              ...prev.resources,
              [section]: {
                ...((prev.resources &&
                  prev.resources[section as "requests" | "limits"]) ||
                  {}),
                [field]: value,
              },
            },
          }));
        } else {
          setNewApp((prev) => ({
            ...prev,
            resources: {
              ...prev.resources,
              [section]: {
                ...((prev.resources &&
                  prev.resources[section as "requests" | "limits"]) ||
                  {}),
                [field]: value,
              },
            },
          }));
        }
      }
      return;
    }
    if (name.startsWith("ingress.")) {
      const [, field] = name.split(".");
      const fieldValue = type === "checkbox" ? !!checked : value;
      if (editId) {
        setEditApp((prev) => ({
          ...prev,
          ingress: {
            ...prev.ingress,
            [field]: field === "enabled" ? !!fieldValue : fieldValue,
            enabled:
              field === "enabled"
                ? !!fieldValue
                : prev.ingress?.enabled ?? false,
          },
        }));
      } else {
        setNewApp((prev) => ({
          ...prev,
          ingress: {
            ...prev.ingress,
            [field]: field === "enabled" ? !!fieldValue : fieldValue,
            enabled:
              field === "enabled"
                ? !!fieldValue
                : prev.ingress?.enabled ?? false,
          },
        }));
      }
      return;
    }
    if (name === "volumesJson") {
      try {
        const parsed = JSON.parse(value);
        if (editId) setEditApp((prev) => ({ ...prev, volumes: parsed }));
        else setNewApp((prev) => ({ ...prev, volumes: parsed }));
      } catch {
        // ignore parse errors for now
      }
      return;
    }
    // Default flat fields
    if (editId) {
      setEditApp((prev) => ({ ...prev, [name]: value }));
    } else {
      setNewApp((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Render a form for adding or editing an app
  const renderAppForm = (
    app: Partial<Application>,
    isEdit: boolean,
    onChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void,
    onSave: () => void,
    onCancel: () => void,
    actionLoading: boolean
  ) => (
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
      {/* Resources Section */}
      <div className="col-span-2 mt-4">
        <h3 className="font-semibold mb-2">Resources</h3>
        <div className="grid grid-cols-2 gap-2">
          <input
            className="input"
            placeholder="CPU Requests"
            name="resources.requests.cpu"
            value={app.resources?.requests?.cpu || ""}
            onChange={onChange}
            disabled={actionLoading}
          />
          <input
            className="input"
            placeholder="Memory Requests"
            name="resources.requests.memory"
            value={app.resources?.requests?.memory || ""}
            onChange={onChange}
            disabled={actionLoading}
          />
          <input
            className="input"
            placeholder="CPU Limits"
            name="resources.limits.cpu"
            value={app.resources?.limits?.cpu || ""}
            onChange={onChange}
            disabled={actionLoading}
          />
          <input
            className="input"
            placeholder="Memory Limits"
            name="resources.limits.memory"
            value={app.resources?.limits?.memory || ""}
            onChange={onChange}
            disabled={actionLoading}
          />
        </div>
      </div>
      {/* Ingress Section */}
      <div className="col-span-2 mt-4">
        <h3 className="font-semibold mb-2">Ingress</h3>
        <label className="flex items-center gap-2 mb-2">
          <input
            type="checkbox"
            name="ingress.enabled"
            checked={!!app.ingress?.enabled}
            onChange={onChange}
            disabled={actionLoading}
          />
          Enable Ingress
        </label>
        <input
          className="input"
          placeholder="Ingress Host"
          name="ingress.host"
          value={app.ingress?.host || ""}
          onChange={onChange}
          disabled={actionLoading}
        />
      </div>
      {/* Volumes Section (basic) */}
      <div className="col-span-2 mt-4">
        <h3 className="font-semibold mb-2">Volumes (JSON)</h3>
        <textarea
          className="input"
          name="volumesJson"
          placeholder='[{"name":"my-secret","mountPath":"/etc/secret","type":"secret","secretName":"my-secret"}]'
          value={JSON.stringify(app.volumes || [], null, 2)}
          onChange={(e) => onChange(e)}
          disabled={actionLoading}
          rows={3}
        />
        <div className="text-xs text-zinc-400 mt-1">
          Edit as JSON for now. Advanced UI can be added later.
        </div>
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

  // Render a single app card (view or edit mode)
  const renderAppCard = (app: Application) => (
    <div
      key={app._id}
      className="rounded-xl bg-white/5 shadow border border-neutral-200 dark:border-neutral-700 p-5 hover:shadow-md transition-all group"
    >
      {editId === app._id ? (
        renderAppForm(
          editApp,
          true,
          handleInputChange,
          handleSaveEdit,
          handleCancelEdit,
          actionLoading
        )
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
              onClick={() => handleEdit(app)}
              disabled={actionLoading}
            >
              <FaEdit /> Edit
            </button>
            <button
              className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded shadow-sm flex items-center gap-2 text-sm"
              onClick={() => handleDelete(app._id)}
              disabled={actionLoading}
            >
              <FaTrash /> Delete
            </button>
          </div>
        </div>
      )}
      {/* Resources */}
      <div className="text-xs text-zinc-500 mt-2">
        <div>CPU Requests: {app.resources?.requests?.cpu || "-"}</div>
        <div>Memory Requests: {app.resources?.requests?.memory || "-"}</div>
        <div>CPU Limits: {app.resources?.limits?.cpu || "-"}</div>
        <div>Memory Limits: {app.resources?.limits?.memory || "-"}</div>
      </div>
      {/* Ingress */}
      <div className="text-xs text-zinc-500 mt-2">
        <div>Ingress Enabled: {app.ingress?.enabled ? "Yes" : "No"}</div>
        <div>Ingress Host: {app.ingress?.host || "-"}</div>
      </div>
      {/* Volumes */}
      <div className="text-xs text-zinc-500 mt-2">
        <div>Volumes: {app.volumes ? app.volumes.length : 0}</div>
        {app.volumes && app.volumes.length > 0 && (
          <pre className="bg-neutral-900/50 rounded p-2 mt-1 text-xs overflow-x-auto max-h-32">
            {JSON.stringify(app.volumes, null, 2)}
          </pre>
        )}
      </div>
      <div className="mt-3 text-xs text-zinc-500 text-right">
        Last updated: {new Date(app.updatedAt).toLocaleString()}
      </div>
    </div>
  );

  if (authLoading || loading) return <div className="p-8">Loading...</div>;

  if (error) return <div className="p-8 text-red-500">{error}</div>;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-8 flex items-center gap-4">
        Your Applications
        <button
          className="ml-auto px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded shadow-sm transition-all text-sm flex items-center gap-2"
          onClick={() => setShowAdd((v) => !v)}
          disabled={actionLoading}
        >
          <FaPlus /> Add
        </button>
      </h1>
      {showAdd && (
        <div className="mb-8 rounded-xl p-5 bg-white/5 shadow border border-neutral-200 dark:border-neutral-700">
          {renderAppForm(
            newApp,
            false,
            handleInputChange,
            handleAdd,
            () => setShowAdd(false),
            actionLoading
          )}
        </div>
      )}
      {applications.length === 0 ? (
        <div className="text-center text-zinc-400 py-12">
          No applications found.
        </div>
      ) : (
        <div className="grid gap-5">
          {applications.map((app) => renderAppCard(app))}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;

// Add some basic input styling
// You can add this to your global CSS or Tailwind config
// .input { @apply px-3 py-2 rounded border border-neutral-300 dark:border-neutral-700 bg-white/10 dark:bg-neutral-800 text-black dark:text-white w-full text-sm focus:outline-none focus:ring-2 focus:ring-sky-400; margin-bottom: 0.25rem; }
