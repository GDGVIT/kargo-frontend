"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "../../utils/api";
import type { Application } from "../../types/Application";

export default function ConfigureApp({ appId }: { appId: string }) {
  const [form, setForm] = useState<Application | null>(null);
  const [envList, setEnvList] = useState<[string, string][]>([]);
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
      const app = res.data.application;
      setForm({
        ...app,
        resources: app.resources || { requests: {}, limits: {} },
        ports: app.ports || [],
      });
      setEnvList(app.env ? Object.entries(app.env) : []);
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
      if (!form) return;

      const envObj = envList.reduce(
        (acc, [k, v]) => (k ? { ...acc, [k]: v } : acc),
        {} as Record<string, string>
      );
      await axios.put(`/api/applications/${appId}`, {
        ...form,
        env: envObj,
      });
      fetchApp();
    } catch {
      setError("Failed to save");
    }
    setSaving(false);
  }

  function handleEnvChange(idx: number, key: string, value: string) {
    setEnvList((prev) =>
      prev.map((pair, i) => (i === idx ? [key, value] : pair))
    );
  }
  function addEnvVar() {
    setEnvList((prev) => [...prev, ["", ""]]);
  }
  function removeEnvVar(idx: number) {
    setEnvList((prev) => prev.filter((_, i) => i !== idx));
  }

  function handleResourceChange(
    section: "requests" | "limits",
    field: "cpu" | "memory",
    value: string
  ) {
    setForm((f) =>
      f
        ? {
            ...f,
            resources: {
              ...f.resources,
              [section]: {
                ...((f.resources && f.resources[section]) || {}),
                [field]: value,
              },
            },
          }
        : f
    );
  }

  function handlePortChange(idx: number, field: string, value: string) {
    setForm((f) =>
      f
        ? {
            ...f,
            ports: (f.ports ?? []).map((port, i) =>
              i === idx
                ? {
                    ...port,
                    [field]: field === "containerPort" ? Number(value) : value,
                  }
                : port
            ),
          }
        : f
    );
  }
  function addPort() {
    setForm((f) =>
      f
        ? {
            ...f,
            ports: [
              ...(f.ports ?? []),
              { containerPort: 80, name: "", protocol: "TCP" },
            ],
          }
        : f
    );
  }
  function removePort(idx: number) {
    setForm((f) =>
      f ? { ...f, ports: (f.ports ?? []).filter((_, i) => i !== idx) } : f
    );
  }

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center  text-white animate-fade-in">
        Loading...
      </div>
    );
  if (!form)
    return (
      <div className="min-h-screen flex items-center justify-center  text-white animate-fade-in">
        App not found
      </div>
    );

  return (
    <div className="min-h-screen  text-white p-6 flex flex-col items-center animate-fade-in">
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
        className="bg-gray-900/90 backdrop-blur rounded-xl shadow-2xl p-8 w-full max-w-2xl space-y-8 animate-slide-in border border-gray-800"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="mb-1 font-medium">Image URL</label>
            <input
              className="w-full p-3 rounded-lg  border border-gray-700 focus:ring-2 focus:ring-blue-600 outline-none transition"
              required
              value={form.imageUrl}
              onChange={(e) =>
                setForm((f) => (f ? { ...f, imageUrl: e.target.value } : f))
              }
              placeholder="registry.io/my-app"
            />
          </div>
          <div>
            <label className="mb-1 font-medium">Image Tag</label>
            <input
              className="w-full p-3 rounded-lg  border border-gray-700 focus:ring-2 focus:ring-blue-600 outline-none transition"
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
          <label className="mb-1 font-medium flex items-center justify-between">
            Environment Variables
            <button
              type="button"
              className="ml-2 px-2 py-1 bg-blue-700 rounded text-xs hover:bg-blue-800"
              onClick={addEnvVar}
            >
              + Add
            </button>
          </label>
          <div className="space-y-2">
            {envList.length === 0 && (
              <div className="text-gray-500 text-sm">
                No environment variables
              </div>
            )}
            {envList.map(([key, value], idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <input
                  className="p-2 rounded  border border-gray-700 flex-1 text-sm"
                  placeholder="KEY"
                  value={key}
                  onChange={(e) => handleEnvChange(idx, e.target.value, value)}
                />
                <span className="text-gray-400">=</span>
                <input
                  className="p-2 rounded  border border-gray-700 flex-1 text-sm"
                  placeholder="VALUE"
                  value={value}
                  onChange={(e) => handleEnvChange(idx, key, e.target.value)}
                />
                <button
                  type="button"
                  className="ml-2 px-2 py-1 bg-red-700 rounded text-xs hover:bg-red-800"
                  onClick={() => removeEnvVar(idx)}
                  title="Remove"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
        <div>
          <label className="mb-1 font-medium">Resources</label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-gray-400 mb-1">CPU Requests</div>
              <input
                className="w-full p-2 rounded  border border-gray-700 text-sm"
                value={form.resources?.requests?.cpu || ""}
                onChange={(e) =>
                  handleResourceChange("requests", "cpu", e.target.value)
                }
                placeholder="100m"
              />
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-1">Memory Requests</div>
              <input
                className="w-full p-2 rounded  border border-gray-700 text-sm"
                value={form.resources?.requests?.memory || ""}
                onChange={(e) =>
                  handleResourceChange("requests", "memory", e.target.value)
                }
                placeholder="128Mi"
              />
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-1">CPU Limits</div>
              <input
                className="w-full p-2 rounded  border border-gray-700 text-sm"
                value={form.resources?.limits?.cpu || ""}
                onChange={(e) =>
                  handleResourceChange("limits", "cpu", e.target.value)
                }
                placeholder="500m"
              />
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-1">Memory Limits</div>
              <input
                className="w-full p-2 rounded  border border-gray-700 text-sm"
                value={form.resources?.limits?.memory || ""}
                onChange={(e) =>
                  handleResourceChange("limits", "memory", e.target.value)
                }
                placeholder="512Mi"
              />
            </div>
          </div>
        </div>
        <div>
          <label className="mb-1 font-medium flex items-center justify-between">
            Ports
            <button
              type="button"
              className="ml-2 px-2 py-1 bg-blue-700 rounded text-xs hover:bg-blue-800"
              onClick={addPort}
            >
              + Add
            </button>
          </label>
          <div className="space-y-2">
            {(form.ports ?? []).length === 0 && (
              <div className="text-gray-500 text-sm">No ports defined</div>
            )}
            {(form.ports ?? []).map((port, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <input
                  className="p-2 rounded  border border-gray-700 w-24 text-sm"
                  type="number"
                  min={1}
                  max={65535}
                  value={port.containerPort}
                  onChange={(e) =>
                    handlePortChange(idx, "containerPort", e.target.value)
                  }
                  placeholder="Port"
                />
                <input
                  className="p-2 rounded  border border-gray-700 w-24 text-sm"
                  value={port.name || ""}
                  onChange={(e) =>
                    handlePortChange(idx, "name", e.target.value)
                  }
                  placeholder="Name"
                />
                <select
                  className="p-2 rounded  border border-gray-700 w-28 text-sm"
                  value={port.protocol || "TCP"}
                  onChange={(e) =>
                    handlePortChange(idx, "protocol", e.target.value)
                  }
                  title="Protocol"
                  aria-label="Protocol"
                >
                  <option value="TCP">TCP</option>
                  <option value="UDP">UDP</option>
                </select>
                <button
                  type="button"
                  className="ml-2 px-2 py-1 bg-red-700 rounded text-xs hover:bg-red-800"
                  onClick={() => removePort(idx)}
                  title="Remove"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
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
