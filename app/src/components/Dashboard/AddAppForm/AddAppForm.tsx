"use client";

import { useState } from "react";
import axios from "../../../utils/api";
import { useRouter } from "next/navigation";
import { useNotification } from "../../ui/Notification/Notification";
import type RegistryCredential from "../../../types/Registry/RegistryCredential/RegistryCredential";
import { useEffect } from "react";
import { AnimatedButton } from "../../ui/AnimatedButton/AnimatedButton";

function Input({
  className = "",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full px-3 py-2 border border-gray-700 bg-gray-800 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 ${className}`}
    />
  );
}

function Select({
  className = "",
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`w-full px-3 py-2 border border-gray-700 bg-gray-800 text-gray-100 rounded-md ${className}`}
    />
  );
}

export default function AddAppForm() {
  const [form, setForm] = useState({
    name: "",
    imageUrl: "",
    imageTag: "",
    credentials: [] as RegistryCredential[],
  });
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState<RegistryCredential[]>([]);
  const [selectedCredential, setSelectedCredential] =
    useState<RegistryCredential | null>(null);
  const router = useRouter();
  const { notify } = useNotification();

  useEffect(() => {
    axios
      .get("/api/users/me/credentials")
      .then((res) => setCredentials(res.data.credentials));
  }, []);

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
      await axios.post("/api/applications", {
        ...form,
        credentials: selectedCredential ? [selectedCredential] : [],
      });
      setForm({ name: "", imageUrl: "", imageTag: "", credentials: [] });
      notify("Application added successfully!", "success");
      router.push("/dashboard");
    } catch {
      notify("Failed to add app", "error");
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleAdd} className="mb-8 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Name
          </label>
          <Input
            required
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="My App"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Image URL
          </label>
          <Input
            required
            value={form.imageUrl}
            onChange={(e) =>
              setForm((f) => ({ ...f, imageUrl: e.target.value }))
            }
            placeholder="registry.io/my-app"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Image Tag
          </label>
          <Input
            required
            value={form.imageTag}
            onChange={(e) =>
              setForm((f) => ({ ...f, imageTag: e.target.value }))
            }
            placeholder="latest"
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium text-gray-300 mb-1"
            htmlFor="registry-credential"
          >
            Registry Credential
          </label>
          <Select
            id="registry-credential"
            required
            title="Registry Credential"
            value={
              selectedCredential
                ? selectedCredential.name +
                  ":" +
                  selectedCredential.registryType
                : ""
            }
            onChange={(e) => {
              const [name, registryType] = e.target.value.split(":");
              const cred = credentials.find(
                (c) => c.name === name && c.registryType === registryType
              );
              setSelectedCredential(cred || null);
              setForm((f) => ({
                ...f,
                credentials: cred ? [cred] : [],
              }));
            }}
          >
            <option value="">Select a credential</option>
            {credentials.map((cred) => (
              <option
                key={cred.name + cred.registryType}
                value={cred.name + ":" + cred.registryType}
              >
                {cred.name} [{cred.registryType}] ({cred.username})
              </option>
            ))}
          </Select>
          <a
            href="/credentials"
            className="text-xs text-blue-400 hover:underline mt-1 inline-block"
          >
            Manage credentials
          </a>
        </div>
      </div>
      <AnimatedButton
        type="submit"
        disabled={loading}
        className="mt-4 !px-6 !py-2"
        icon={null}
      >
        {loading ? "Adding..." : "Add Application"}
      </AnimatedButton>
    </form>
  );
}
