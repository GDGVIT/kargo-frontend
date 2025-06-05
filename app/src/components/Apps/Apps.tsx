"use client";

import React, { useEffect, useState } from "react";
import axios from "../../utils/api";
import type { AxiosError } from "axios";
import { useAuth } from "../Auth/AuthProvider/AuthProvider";
import { FaPlus } from "react-icons/fa";
import AppForm from "./AppForm";
import AppList from "./AppList";
import type { Application } from "../../types/Application";

const emptyApp: Application = {
  _id: "",
  name: "",
  imageUrl: "",
  imageTag: "latest",
  registryToken: "",
  namespace: "default",
  deploymentName: "",
  serviceName: "",
  ingressHost: "",
  env: {},
  createdAt: "",
  updatedAt: "",
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
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editId) {
      setEditApp((prev) => ({ ...prev, [name]: value }));
    } else {
      setNewApp((prev) => ({ ...prev, [name]: value }));
    }
  };

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
          <AppForm
            app={newApp}
            actionLoading={actionLoading}
            onChange={handleInputChange}
            onSave={handleAdd}
            onCancel={() => setShowAdd(false)}
          />
        </div>
      )}
      {applications.length === 0 ? (
        <div className="text-center text-zinc-400 py-12">
          No applications found.
        </div>
      ) : (
        <AppList
          applications={applications}
          editId={editId}
          editApp={editApp}
          actionLoading={actionLoading}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onEditChange={handleInputChange}
          onSaveEdit={handleSaveEdit}
          onCancelEdit={handleCancelEdit}
        />
      )}
    </div>
  );
};

export default DashboardPage;

// Add some basic input styling
// You can add this to your global CSS or Tailwind config
// .input { @apply px-3 py-2 rounded border border-neutral-300 dark:border-neutral-700 bg-white/10 dark:bg-neutral-800 text-black dark:text-white w-full text-sm focus:outline-none focus:ring-2 focus:ring-sky-400; margin-bottom: 0.25rem; }
