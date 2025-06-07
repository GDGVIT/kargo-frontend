"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "../../utils/api";
import { useNotification } from "../Notification/Notification";
import Modal from "../Modal/Modal";

export default function Dashboard() {
  const [apps, setApps] = useState([]);
  const [form, setForm] = useState({
    name: "",
    imageUrl: "",
    imageTag: "",
    registryToken: "",
  });
  const [loading, setLoading] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const router = useRouter();
  const { notify } = useNotification();

  const fetchApps = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/applications");
      setApps(res.data.applications);
    } catch {
      notify("Failed to load apps", "error");
    }
    setLoading(false);
  }, [notify]);

  useEffect(() => {
    fetchApps();
  }, [fetchApps]);

  function isValidAppName(name: string) {
    return /^[a-z0-9]([-a-z0-9]*[a-z0-9])?$/.test(name);
  }

  async function handleAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    if (!isValidAppName(form.name)) {
      notify(
        "Application name must be lowercase, alphanumeric, and may contain hyphens. No underscores or uppercase letters allowed.",
        "error"
      );
      setLoading(false);
      return;
    }
    try {
      await axios.post("/api/applications", form);
      setForm({ name: "", imageUrl: "", imageTag: "", registryToken: "" });
      fetchApps();
      notify("Application added successfully!", "success");
    } catch {
      notify("Failed to add app", "error");
    }
    setLoading(false);
  }

  async function handleDeleteApp(id: string) {
    setLoading(true);
    try {
      await axios.delete(`/api/applications/${id}`);
      fetchApps();
      notify("Application deleted successfully!", "success");
    } catch {
      notify("Failed to delete app", "error");
    }
    setLoading(false);
    setConfirmDeleteId(null);
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-900 rounded-lg shadow-md mt-8 border border-gray-800">
      <h1 className="text-2xl font-bold mb-6 text-gray-100">
        Your Applications
      </h1>
      <form onSubmit={handleAdd} className="mb-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Name
            </label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="My App"
              className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Image URL
            </label>
            <input
              required
              value={form.imageUrl}
              onChange={(e) =>
                setForm((f) => ({ ...f, imageUrl: e.target.value }))
              }
              placeholder="registry.io/my-app"
              className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Image Tag
            </label>
            <input
              required
              value={form.imageTag}
              onChange={(e) =>
                setForm((f) => ({ ...f, imageTag: e.target.value }))
              }
              placeholder="latest"
              className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Registry Token
            </label>
            <input
              required
              value={form.registryToken}
              onChange={(e) =>
                setForm((f) => ({ ...f, registryToken: e.target.value }))
              }
              placeholder="ghp_..."
              className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors font-semibold"
        >
          {loading ? "Adding..." : "Add Application"}
        </button>
      </form>
      <Modal
        open={!!confirmDeleteId}
        onClose={() => setConfirmDeleteId(null)}
        title="Delete Application"
      >
        <div className="text-red-200 mb-4">
          Are you sure you want to delete this application? This action cannot
          be undone.
        </div>
        <div className="flex gap-3 justify-end">
          <button
            onClick={() => setConfirmDeleteId(null)}
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={() => handleDeleteApp(confirmDeleteId!)}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 font-semibold"
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </Modal>
      <div>
        {loading ? (
          <div className="text-center text-gray-400">Loading...</div>
        ) : apps.length === 0 ? (
          <div className="text-center text-gray-500">
            No applications yet. Add your first app above!
          </div>
        ) : (
          <div className="grid gap-6">
            {apps.map(
              (
                app: {
                  _id: string;
                  name: string;
                  imageUrl: string;
                  imageTag: string;
                  registryToken: string;
                },
                idx: number
              ) => (
                <div
                  key={app._id}
                  className="bg-gray-800/90 rounded-xl shadow-xl p-6 cursor-pointer hover:scale-[1.03] hover:shadow-2xl transition-transform border border-gray-700 group relative overflow-hidden animate-pop"
                  onClick={() => router.push(`/dashboard/${app._id}`)}
                  data-animate-delay={idx * 60}
                >
                  <div title="Active" />
                  <h2 className="text-lg font-semibold text-white mb-1">
                    {app.name}
                  </h2>
                  <div className="text-gray-300 text-sm mb-1">
                    {app.imageUrl}:{app.imageTag}
                  </div>
                  <div className="text-gray-400 text-xs mb-2 break-all">
                    {app.registryToken}
                  </div>
                  <span className="text-blue-400 text-sm font-medium">
                    Click to configure →
                  </span>
                  <button
                    className="absolute top-3 right-3 text-red-400 hover:text-red-600 bg-transparent border-none p-1"
                    title="Delete app"
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setConfirmDeleteId(app._id);
                    }}
                  >
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                      <path
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 6h18M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14z"
                      />
                    </svg>
                  </button>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
