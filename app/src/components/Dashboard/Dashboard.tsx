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
    <div>
      <h1>Your Applications</h1>
      <form onSubmit={handleAdd}>
        <div>
          <div>
            <label>Name</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="My App"
            />
          </div>
          <div>
            <label>Image URL</label>
            <input
              required
              value={form.imageUrl}
              onChange={(e) =>
                setForm((f) => ({ ...f, imageUrl: e.target.value }))
              }
              placeholder="registry.io/my-app"
            />
          </div>
          <div>
            <label>Image Tag</label>
            <input
              required
              value={form.imageTag}
              onChange={(e) =>
                setForm((f) => ({ ...f, imageTag: e.target.value }))
              }
              placeholder="latest"
            />
          </div>
          <div>
            <label>Registry Token</label>
            <input
              required
              value={form.registryToken}
              onChange={(e) =>
                setForm((f) => ({ ...f, registryToken: e.target.value }))
              }
              placeholder="ghp_..."
            />
          </div>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Application"}
        </button>
        {error && <div>{error}</div>}
      </form>
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : apps.length === 0 ? (
          <div>No applications yet. Add your first app above!</div>
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
                <div title="Active" />
                <h2>{app.name}</h2>
                <div>
                  {app.imageUrl}:{app.imageTag}
                </div>
                <div>{app.registryToken}</div>
                <span>Click to configure →</span>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
}
