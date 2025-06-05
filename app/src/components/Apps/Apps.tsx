"use client";

import React, { useState, useEffect } from "react";
import { AxiosError } from "axios";
import { Application } from "../../types/Application";
import { useAuth } from "../Auth/AuthProvider/AuthProvider";
import AppList from "./AppList";
import AppCreateForm from "./AppCreateForm";
import AppEditForm from "./AppEditForm";
import api from "../../utils/api";

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

const Apps: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [editApp, setEditApp] = useState<Partial<Application>>({ ...emptyApp });
  const [actionLoading, setActionLoading] = useState(false);

  // Fetch applications
  const fetchApplications = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/api/applications");
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

  // Add Application (basic fields only)
  const handleAdd = async (data: {
    name: string;
    imageUrl: string;
    imageTag: string;
    registryToken: string;
  }) => {
    setActionLoading(true);
    setError(null);
    try {
      await api.post("/api/applications", data);
      setShowAdd(false);
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
      await api.delete(`/api/applications/${id}`);
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

  // Edit Application (open edit form)
  const handleEdit = (app: Application) => {
    setEditId(app._id);
    setEditApp({ ...app });
  };

  // Save Edit (advanced fields)
  const handleSaveEdit = async () => {
    if (!editId) return;
    setActionLoading(true);
    setError(null);
    try {
      await api.put(`/api/applications/${editId}`, editApp);
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

  // Handle edit form input change
  const handleEditInputChange = (changed: Partial<Application>) => {
    setEditApp((prev) => ({ ...prev, ...changed }));
  };

  if (authLoading || loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-8 flex items-center gap-4">
        Your Applications
        <button
          className="btn btn-primary ml-auto"
          onClick={() => setShowAdd(true)}
        >
          Add Application
        </button>
      </h1>
      {showAdd && (
        <div className="mb-8 rounded-xl p-5 bg-white/5 shadow border border-neutral-200 dark:border-neutral-700">
          <AppCreateForm
            onCreate={handleAdd}
            loading={actionLoading}
            onCancel={() => setShowAdd(false)}
          />
        </div>
      )}
      {editId && (
        <div className="mb-8 rounded-xl p-5 bg-white/5 shadow border border-neutral-200 dark:border-neutral-700">
          <AppEditForm
            app={editApp as Application}
            onChange={handleEditInputChange}
            onSave={handleSaveEdit}
            onCancel={handleCancelEdit}
            loading={actionLoading}
          />
        </div>
      )}
      <AppList
        applications={applications}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={actionLoading}
      />
    </div>
  );
};

export default Apps;
