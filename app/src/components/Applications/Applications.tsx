"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "../../utils/api";
import useNotification from "../ui/Notification/Notification";
import Modal from "../ui/Modal/Modal";
import AnimatedButton from "../ui/AnimatedButton/AnimatedButton";
import { FaTrash } from "react-icons/fa";

export default function Applications() {
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
    <section>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-100">Your Applications</h1>
        <AnimatedButton
          onClick={() => router.push("/applications/add")}
          className="!px-4 !py-2 !h-auto !min-w-0 !text-base"
          icon={null}
          variant="primary"
        >
          Add Application
        </AnimatedButton>
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
          <AnimatedButton
            onClick={() => setConfirmDeleteId(null)}
            className=""
            icon={null}
            title="Cancel"
            variant="secondary"
          >
            Cancel
          </AnimatedButton>
          <AnimatedButton
            onClick={() => handleDeleteApp(confirmDeleteId!)}
            className="font-semibold"
            icon={<FaTrash />}
            disabled={loading}
            title="Delete"
            variant="danger"
          >
            {loading ? "Deleting..." : "Delete"}
          </AnimatedButton>
        </div>
      </Modal>
      <div className="min-h-[250px]">
        {loading ? (
          <div className="text-center text-gray-400">Loading...</div>
        ) : apps.length === 0 ? (
          <div className="text-center text-gray-500">
            No applications yet. Click &quot;Add Application&quot; to create
            your first app!
          </div>
        ) : (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
                  onClick={() => router.push(`/applications/${app._id}`)}
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
                </div>
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
}
