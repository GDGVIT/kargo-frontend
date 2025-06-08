"use client";

import { useEffect, useState } from "react";
import axios from "../../utils/api";

export type RegistryType = "dockerhub" | "github" | "gitlab" | "other";
export interface RegistryCredential {
  name: string;
  registryType: RegistryType;
  username: string;
  token: string;
}

export default function Credentials({
  onSelect,
}: {
  onSelect?: (cred: RegistryCredential) => void;
}) {
  const [credentials, setCredentials] = useState<RegistryCredential[]>([]);
  const [form, setForm] = useState<RegistryCredential>({
    name: "",
    registryType: "dockerhub",
    username: "",
    token: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCredentials = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/users/me/credentials");
      setCredentials(res.data.credentials);
    } catch {
      setError("Failed to load credentials");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCredentials();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    // Prevent duplicate name+registryType
    if (
      credentials.some(
        (c) => c.name === form.name && c.registryType === form.registryType
      )
    ) {
      setError("Credential with this name and registry type already exists.");
      setLoading(false);
      return;
    }
    try {
      await axios.post("/api/users/me/credentials", form);
      setForm({ name: "", registryType: "dockerhub", username: "", token: "" });
      await fetchCredentials(); // Await to ensure UI updates after add
    } catch {
      setError("Failed to save credential");
    }
    setLoading(false);
  };

  const handleDelete = async (cred: RegistryCredential) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete("/api/users/me/credentials", {
        data: { name: cred.name, registryType: cred.registryType },
      });
      await fetchCredentials(); // Await to ensure UI updates after delete
    } catch {
      setError("Failed to delete credential");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-8">
      <h2 className="text-xl font-bold mb-4 text-gray-100">
        Registry Credentials
      </h2>
      <form
        onSubmit={handleAdd}
        className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div>
          <label
            className="block text-sm font-medium text-gray-300 mb-1"
            htmlFor="cred-name"
          >
            Name
          </label>
          <input
            required
            id="cred-name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-gray-100 rounded-md"
            placeholder="e.g. DockerHub Personal"
            title="Credential Name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Registry
          </label>
          <select
            required
            id="cred-registryType"
            title="Registry Type"
            value={form.registryType}
            onChange={(e) =>
              setForm((f) => ({
                ...f,
                registryType: e.target.value as RegistryType,
              }))
            }
            className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-gray-100 rounded-md"
          >
            <option value="dockerhub">Docker Hub</option>
            <option value="github">GitHub</option>
            <option value="gitlab">GitLab</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Username
          </label>
          <input
            required
            id="cred-username"
            title="Registry Username"
            value={form.username}
            onChange={(e) =>
              setForm((f) => ({ ...f, username: e.target.value }))
            }
            className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-gray-100 rounded-md"
            placeholder="Registry username"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Personal Access Token
          </label>
          <input
            required
            id="cred-token"
            title="Personal Access Token"
            value={form.token}
            onChange={(e) => setForm((f) => ({ ...f, token: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-gray-100 rounded-md"
            type="password"
            placeholder="Personal access token"
          />
        </div>
        <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-60 font-semibold"
          >
            {loading ? "Saving..." : "Add Credential"}
          </button>
        </div>
      </form>
      {error && <div className="text-red-400 mb-2">{error}</div>}
      <div>
        <h3 className="text-lg font-semibold text-gray-200 mb-2">
          Saved Credentials
        </h3>
        {credentials.length === 0 ? (
          <div className="text-gray-400">No credentials saved yet.</div>
        ) : (
          <ul className="space-y-2">
            {credentials.map((cred) => (
              <li
                key={cred.name + cred.registryType}
                className="flex items-center justify-between bg-gray-800 rounded p-3"
              >
                <div>
                  <span className="font-medium text-gray-100">{cred.name}</span>
                  <span className="ml-2 text-xs text-gray-400">
                    [{cred.registryType}]
                  </span>
                  <span className="ml-2 text-xs text-gray-400">
                    {cred.username}
                  </span>
                </div>
                <div className="flex gap-2">
                  {onSelect && (
                    <button
                      className="px-2 py-1 bg-green-700 text-white rounded text-xs"
                      onClick={() => onSelect(cred)}
                    >
                      Select
                    </button>
                  )}
                  <button
                    className="px-2 py-1 bg-red-700 text-white rounded text-xs"
                    onClick={() => handleDelete(cred)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
