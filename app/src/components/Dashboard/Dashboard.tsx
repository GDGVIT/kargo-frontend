"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "../../utils/api";

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
    }
    setLoading(false);
  }

  async function handleAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await axios.post("/api/applications", form);
      setForm({ name: "", imageUrl: "", imageTag: "", registryToken: "" });
      fetchApps();
    } catch {
      setError("Failed to add app");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen  text-white p-6 flex flex-col items-center animate-fade-in">
      <h1 className="text-4xl font-extrabold mb-8 tracking-tight drop-shadow-lg animate-fade-in">
        Your Applications
      </h1>
      <form
        onSubmit={handleAdd}
        className="bg-gray-900/90 backdrop-blur rounded-xl shadow-2xl p-8 w-full max-w-lg mb-12 space-y-6 animate-slide-in border border-gray-800"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              className="w-full p-3 rounded-lg  border border-gray-700 focus:ring-2 focus:ring-blue-600 outline-none transition"
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="My App"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Image URL</label>
            <input
              className="w-full p-3 rounded-lg  border border-gray-700 focus:ring-2 focus:ring-blue-600 outline-none transition"
              required
              value={form.imageUrl}
              onChange={(e) =>
                setForm((f) => ({ ...f, imageUrl: e.target.value }))
              }
              placeholder="registry.io/my-app"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Image Tag</label>
            <input
              className="w-full p-3 rounded-lg  border border-gray-700 focus:ring-2 focus:ring-blue-600 outline-none transition"
              required
              value={form.imageTag}
              onChange={(e) =>
                setForm((f) => ({ ...f, imageTag: e.target.value }))
              }
              placeholder="latest"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Registry Token</label>
            <input
              className="w-full p-3 rounded-lg  border border-gray-700 focus:ring-2 focus:ring-blue-600 outline-none transition"
              required
              value={form.registryToken}
              onChange={(e) =>
                setForm((f) => ({ ...f, registryToken: e.target.value }))
              }
              placeholder="ghp_..."
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 font-semibold text-lg shadow transition disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Application"}
        </button>
        {error && (
          <div className="text-red-400 text-sm text-center animate-shake">
            {error}
          </div>
        )}
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl animate-fade-in">
        {loading ? (
          <div className="col-span-full text-center text-lg">Loading...</div>
        ) : apps.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 text-xl py-12 animate-fade-in">
            No applications yet. Add your first app above!
          </div>
        ) : (
          apps.map(
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
                className={`bg-gray-900/90 rounded-xl shadow-xl p-6 cursor-pointer hover:scale-[1.03] hover:shadow-2xl transition-transform border border-gray-800 group relative overflow-hidden animate-pop`}
                onClick={() => router.push(`/dashboard/${app._id}`)}
                data-animate-delay={idx * 60}
              >
                <div
                  className="absolute right-4 top-4 w-2 h-2 rounded-full bg-green-500 animate-pulse"
                  title="Active"
                />
                <h2 className="text-2xl font-bold mb-1 group-hover:text-blue-400 transition-colors">
                  {app.name}
                </h2>
                <div className="text-gray-400 text-sm mb-2">
                  {app.imageUrl}:{app.imageTag}
                </div>
                <div className="text-xs text-gray-500 truncate mb-2">
                  {app.registryToken}
                </div>
                <span className="inline-block mt-2 text-blue-500 text-xs font-mono opacity-80 group-hover:opacity-100 transition">
                  Click to configure →
                </span>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
}
