// ConfigureApp.tsx
// Modern config editor for a single app
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "../../utils/api";
import type { Application } from "../../types/Application";

export default function ConfigureApp({ appId }: { appId: string }) {
  const [form, setForm] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchApp();
    // eslint-disable-next-line
  }, [appId]);

  async function fetchApp() {
    setLoading(true);
    try {
      const res = await axios.get(`/api/applications/${appId}`);
      setForm(res.data.application);
    } catch {
      setError("Failed to load app");
    }
    setLoading(false);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await axios.put(`/api/applications/${appId}`, form);
      fetchApp();
    } catch {
      setError("Failed to save");
    }
    setSaving(false);
  }

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white animate-fade-in">
        Loading...
      </div>
    );
  if (!form)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white animate-fade-in">
        App not found
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 text-white p-6 flex flex-col items-center animate-fade-in">
      <button
        onClick={() => router.push("/dashboard")}
        className="mb-8 text-blue-400 hover:underline text-lg self-start"
      >
        ← Back to Dashboard
      </button>
      <h1 className="text-3xl font-extrabold mb-6 tracking-tight drop-shadow-lg animate-fade-in">
        Configure <span className="text-blue-400">{form.name}</span>
      </h1>
      <form
        onSubmit={handleSave}
        className="bg-gray-900/80 backdrop-blur rounded-xl shadow-2xl p-8 w-full max-w-2xl space-y-6 animate-slide-in border border-gray-800"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 font-medium">Image URL</label>
            <input
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-600 outline-none transition"
              required
              value={form.imageUrl}
              onChange={(e) =>
                setForm((f) => (f ? { ...f, imageUrl: e.target.value } : f))
              }
              placeholder="registry.io/my-app"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Image Tag</label>
            <input
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-600 outline-none transition"
              required
              value={form.imageTag}
              onChange={(e) =>
                setForm((f) => (f ? { ...f, imageTag: e.target.value } : f))
              }
              placeholder="latest"
            />
          </div>
        </div>
        <div>
          <label className="block mb-1 font-medium">
            Environment Variables (JSON)
          </label>
          <textarea
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 font-mono focus:ring-2 focus:ring-blue-600 outline-none transition"
            rows={4}
            value={JSON.stringify(form.env || {}, null, 2)}
            onChange={(e) =>
              setForm((f) =>
                f ? { ...f, env: safeJsonParse(e.target.value, {}) } : f
              )
            }
            placeholder={'{\n  "KEY": "VALUE"\n}'}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Resources (JSON)</label>
          <textarea
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 font-mono focus:ring-2 focus:ring-blue-600 outline-none transition"
            rows={3}
            value={JSON.stringify(form.resources || {}, null, 2)}
            onChange={(e) =>
              setForm((f) =>
                f ? { ...f, resources: safeJsonParse(e.target.value, {}) } : f
              )
            }
            placeholder={
              '{\n  "requests": {\n    "cpu": "100m",\n    "memory": "128Mi"\n  },\n  "limits": {\n    "cpu": "500m",\n    "memory": "512Mi"\n  }\n}'
            }
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Ports (JSON)</label>
          <textarea
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 font-mono focus:ring-2 focus:ring-blue-600 outline-none transition"
            rows={2}
            value={JSON.stringify(form.ports || [], null, 2)}
            onChange={(e) =>
              setForm((f) =>
                f ? { ...f, ports: safeJsonParse(e.target.value, []) } : f
              )
            }
            placeholder={
              '[\n  {\n    "containerPort": 80,\n    "name": "http"\n  }\n]'
            }
          />
        </div>
        {/* Add more advanced config fields as needed */}
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 font-semibold text-lg shadow transition disabled:opacity-60"
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
        {error && (
          <div className="text-red-400 text-sm text-center animate-shake">
            {error}
          </div>
        )}
      </form>
    </div>
  );
}

// Helper for safe JSON parsing
function safeJsonParse<T>(str: string, fallback: T): T {
  try {
    return JSON.parse(str);
  } catch {
    return fallback;
  }
}
