"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "../../utils/api";
import { useNotification } from "../Notification/Notification";

export default function Dashboard() {
  const [apps, setApps] = useState([]);
  const [form, setForm] = useState({
    name: "",
    imageUrl: "",
    imageTag: "",
    registryToken: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { notify } = useNotification();

  useEffect(() => {
    fetchApps();
  }, []);

  async function fetchApps() {
    setLoading(true);
    try {
      const res = await axios.get("/api/applications");
      setApps(res.data.applications);
    } catch {
      setError("Failed to load apps");
      notify("Failed to load apps", "error");
    }
    setLoading(false);
  }

  function isValidAppName(name: string) {
    return /^[a-z0-9]([-a-z0-9]*[a-z0-9])?$/.test(name);
  }

  async function handleAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    if (!isValidAppName(form.name)) {
      setError(
        "Application name must be lowercase, alphanumeric, and may contain hyphens. No underscores or uppercase letters allowed."
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
      setError("Failed to add app");
      notify("Failed to add app", "error");
    }
    setLoading(false);
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
        {error && (
          <div className="mt-2 p-2 bg-red-900/60 text-red-200 rounded text-sm border border-red-700">
            {error}
          </div>
        )}
      </form>
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
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
