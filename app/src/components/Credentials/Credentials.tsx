"use client";

import { useEffect, useState } from "react";
import axios from "../../utils/api";
import { Input } from "../ui/Input/Input";
import { Select } from "../ui/Select/Select";
import { AnimatedButton } from "../ui/AnimatedButton/AnimatedButton";
import { Card } from "../ui/Card/Card";
import { FaDocker, FaGithub, FaGitlab, FaKey } from "react-icons/fa";
import { useNotification } from "../ui/Notification/Notification";
import Modal from "../ui/Modal/Modal";

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
  const { notify } = useNotification();
  const [confirmDelete, setConfirmDelete] = useState<RegistryCredential | null>(
    null
  );

  const fetchCredentials = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/users/me/credentials");
      setCredentials(res.data.credentials);
    } catch {
      notify("Failed to load credentials", "error");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCredentials();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Prevent duplicate name+registryType
    if (
      credentials.some(
        (c) => c.name === form.name && c.registryType === form.registryType
      )
    ) {
      notify(
        "Credential with this name and registry type already exists.",
        "warning"
      );
      setLoading(false);
      return;
    }
    try {
      await axios.post("/api/users/me/credentials", form);
      setForm({ name: "", registryType: "dockerhub", username: "", token: "" });
      await fetchCredentials(); // Await to ensure UI updates after add
      notify("Credential added successfully!", "success");
    } catch {
      notify("Failed to save credential", "error");
    }
    setLoading(false);
  };

  const handleDelete = async (cred: RegistryCredential) => {
    setLoading(true);
    try {
      await axios.delete("/api/users/me/credentials", {
        data: { name: cred.name, registryType: cred.registryType },
      });
      await fetchCredentials(); // Await to ensure UI updates after delete
      notify("Credential deleted successfully!", "success");
    } catch {
      notify("Failed to delete credential", "error");
    }
    setLoading(false);
    setConfirmDelete(null);
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
        <Input
          required
          id="cred-name"
          label="Name"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          placeholder="e.g. DockerHub Personal"
          title="Credential Name"
        />
        <Select
          required
          id="cred-registryType"
          label="Registry"
          title="Registry Type"
          value={form.registryType}
          onChange={(e) =>
            setForm((f) => ({
              ...f,
              registryType: e.target.value as RegistryType,
            }))
          }
          options={[
            { value: "dockerhub", label: "Docker Hub" },
            { value: "github", label: "GitHub" },
            { value: "gitlab", label: "GitLab" },
            { value: "other", label: "Other" },
          ]}
        />
        <Input
          required
          id="cred-username"
          label="Username"
          title="Registry Username"
          value={form.username}
          onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))}
          placeholder="Registry username"
        />
        <Input
          required
          id="cred-token"
          label="Personal Access Token"
          title="Personal Access Token"
          value={form.token}
          onChange={(e) => setForm((f) => ({ ...f, token: e.target.value }))}
          type="password"
          placeholder="Personal access token"
        />
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
      {/* Confirmation Modal for Delete */}
      <Modal
        open={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        title="Delete Credential?"
      >
        <div className="mb-4">
          Are you sure you want to delete the credential{" "}
          <span className="font-semibold text-red-400">
            {confirmDelete?.name}
          </span>
          ?
        </div>
        <div className="flex gap-3 justify-end">
          <button
            className="px-4 py-2 rounded bg-gray-600 text-white hover:bg-gray-700"
            onClick={() => setConfirmDelete(null)}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-red-700 text-white hover:bg-red-800"
            onClick={() => confirmDelete && handleDelete(confirmDelete)}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </Modal>
      <div>
        <h3 className="text-lg font-semibold text-gray-200 mb-2">
          Saved Credentials
        </h3>
        {credentials.length === 0 ? (
          <div className="text-gray-400">No credentials saved yet.</div>
        ) : (
          <ul className="space-y-2">
            {credentials.map((cred) => {
              let Icon = FaKey;
              if (cred.registryType === "dockerhub") Icon = FaDocker;
              else if (cred.registryType === "github") Icon = FaGithub;
              else if (cred.registryType === "gitlab") Icon = FaGitlab;
              return (
                <li key={cred.name + cred.registryType}>
                  <Card className="flex items-center justify-between p-3">
                    <div className="flex items-center gap-2">
                      <Icon className="text-lg text-blue-400" />
                      <span className="font-medium text-gray-100">
                        {cred.name}
                      </span>
                      <span className="ml-2 text-xs text-gray-400">
                        {cred.username}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      {onSelect && (
                        <AnimatedButton
                          className="!px-2 !py-1 !rounded text-xs !bg-green-700 hover:!bg-green-800"
                          onClick={() => onSelect(cred)}
                          icon={null}
                        >
                          Select
                        </AnimatedButton>
                      )}
                      <AnimatedButton
                        className="!px-2 !py-1 !rounded text-xs !bg-red-700 hover:!bg-red-800"
                        onClick={() => setConfirmDelete(cred)}
                        icon={null}
                      >
                        Delete
                      </AnimatedButton>
                    </div>
                  </Card>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
