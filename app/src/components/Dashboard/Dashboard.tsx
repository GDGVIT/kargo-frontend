"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "../../utils/api";
import { useNotification } from "../Notification/Notification";
import Modal from "../Modal/Modal";

export default function Dashboard() {
  const [apps, setApps] = useState([]);
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
    <div className="max-w-4xl mx-auto p-6 mt-8 ">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-100">Your Applications</h1>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors font-semibold"
          onClick={() => router.push("/dashboard/add")}
          type="button"
        >
          Add Application
        </button>
      </div>
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
            No applications yet. Click &quot;Add Application&quot; to create
            your first app!
          </div>
        ) : (
          <div className="grid gap-6 ">
            {apps.map(
              (
                app: {
                  _id: string;
                  name: string;
                  imageUrl: string;
                  imageTag: string;
                },
                idx: number
              ) => (
                <div
                  key={app._id}
                  className="bg-[var(--card-background)] rounded-xl shadow-xl p-6 cursor-pointer hover:scale-[1.03] hover:shadow-2xl transition-transform border border-gray-700 group relative overflow-hidden animate-pop"
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
