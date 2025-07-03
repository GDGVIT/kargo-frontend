"use client";

import { useState } from "react";
import axios from "../../../utils/api";
import { useRouter } from "next/navigation";
import useNotification from "../../ui/Notification/Notification";
import type RegistryCredential from "../../../types/Registry/RegistryCredential/RegistryCredential";
import { useEffect } from "react";
import AnimatedButton from "../../ui/AnimatedButton/AnimatedButton";
import { FaPlus } from "react-icons/fa";
import Input from "../../ui/Input/Input";
import Select from "../../ui/Select/Select";
import Modal from "../../ui/Modal/Modal";
import GithubRepos from "../../Github/GithubRepos/GithubRepos";
import type Application from "../../../types/Application/Application";

// Define the Volume type based on Application interface
export type Volume = NonNullable<Application["volumes"]>[number];

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
  const [dockerModalOpen, setDockerModalOpen] = useState(false);
  const [volumes, setVolumes] = useState<Volume[]>([]);
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

  // Volume handlers
  function handleVolumeChange<T extends keyof Volume>(
    idx: number,
    key: T,
    value: Volume[T]
  ) {
    setVolumes((prev) => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], [key]: value };
      return updated;
    });
  }
  function addVolume() {
    setVolumes((prev) => [
      ...prev,
      {
        name: "",
        mountPath: "",
        size: "",
        accessModes: ["ReadWriteOnce"],
        storageClassName: "",
        readOnly: false,
        type: "pvc",
      },
    ]);
  }
  function removeVolume(idx: number) {
    setVolumes((prev) => prev.filter((_, i) => i !== idx));
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
    if (!form.imageUrl || form.imageUrl.trim() === "") {
      notify("No image found. Please dockerize your app first.", "error");
      router.push("/dockerize");
      setLoading(false);
      return;
    }
    try {
      await axios.post("/api/applications", {
        ...form,
        credentials: selectedCredential ? [selectedCredential] : [],
        volumes: volumes.length > 0 ? volumes : undefined,
      });
      setForm({ name: "", imageUrl: "", imageTag: "", credentials: [] });
      setVolumes([]);
      notify("Application added successfully!", "success");
      router.push("/applications");
    } catch {
      notify("Failed to add app", "error");
    }
    setLoading(false);
  }

  return (
    <>
      <Modal
        open={dockerModalOpen}
        onClose={() => setDockerModalOpen(false)}
        title="Dockerize from GitHub"
      >
        <GithubRepos />
      </Modal>
      <form onSubmit={handleAdd} className="mb-8 space-y-4 min-h-[470px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Input
              required
              label="Name"
              value={form.name}
              onChange={(value) => setForm((f) => ({ ...f, name: value }))}
              placeholder="My App"
            />
          </div>
          <div>
            <Input
              required
              label="Image URL"
              value={form.imageUrl}
              onChange={(value) => setForm((f) => ({ ...f, imageUrl: value }))}
              placeholder="registry.io/my-app"
              helperText={
                <AnimatedButton
                  type="button"
                  variant="secondary"
                  className="!px-2 !py-1 text-xs mt-1"
                  onClick={() => setDockerModalOpen(true)}
                >
                  Dockerize your app
                </AnimatedButton>
              }
            />
          </div>
          <div>
            <Input
              required
              label="Image Tag"
              value={form.imageTag}
              onChange={(value) => setForm((f) => ({ ...f, imageTag: value }))}
              placeholder="latest"
            />
          </div>
          <div>
            <Select
              label="Registry Credential"
              value={
                selectedCredential
                  ? selectedCredential.name +
                    ":" +
                    selectedCredential.registryType
                  : ""
              }
              onChange={(val) => {
                const [name, registryType] = val.split(":");
                const cred = credentials.find(
                  (c) => c.name === name && c.registryType === registryType
                );
                setSelectedCredential(cred || null);
                setForm((f) => ({
                  ...f,
                  credentials: cred ? [cred] : [],
                }));
              }}
              options={[
                { value: "", label: "Select a credential" },
                ...credentials.map((cred) => ({
                  value: cred.name + ":" + cred.registryType,
                  label: `${cred.name} [${cred.registryType}] (${cred.username})`,
                })),
              ]}
              helperText={
                <a
                  href="/credentials"
                  className="text-xs text-blue-400 hover:underline mt-1 inline-block"
                >
                  Manage credentials
                </a>
              }
            />
          </div>
        </div>
        {/* PVC Volumes Section */}
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Persistent Volumes (PVCs)</h3>
          {volumes.map((vol, idx) => (
            <div
              key={idx}
              className="border rounded p-3 mb-3 flex flex-wrap gap-2 items-end bg-zinc-900"
            >
              <Input
                label="Volume Name"
                value={vol.name}
                required
                onChange={(v) => handleVolumeChange(idx, "name", v)}
                placeholder="my-pvc"
                className="w-32"
              />
              <Input
                label="Mount Path"
                value={vol.mountPath}
                required
                onChange={(v) => handleVolumeChange(idx, "mountPath", v)}
                placeholder="/data"
                className="w-40"
              />
              <Input
                label="Size (e.g. 10Gi)"
                value={vol.size || ""}
                required
                onChange={(v) => handleVolumeChange(idx, "size", v)}
                placeholder="10Gi"
                className="w-28"
              />
              <Select
                label="Access Modes"
                value={vol.accessModes?.[0] || "ReadWriteOnce"}
                onChange={(v) => handleVolumeChange(idx, "accessModes", [v])}
                options={[
                  { value: "ReadWriteOnce", label: "ReadWriteOnce" },
                  { value: "ReadWriteMany", label: "ReadWriteMany" },
                  { value: "ReadOnlyMany", label: "ReadOnlyMany" },
                ]}
                className="w-40"
              />
              <Input
                label="Storage Class"
                value={vol.storageClassName || ""}
                onChange={(v) => handleVolumeChange(idx, "storageClassName", v)}
                placeholder="(optional)"
                className="w-40"
              />
              <label className="flex items-center gap-1 text-xs">
                <input
                  type="checkbox"
                  checked={!!vol.readOnly}
                  onChange={(e) =>
                    handleVolumeChange(idx, "readOnly", e.target.checked)
                  }
                />
                Read Only
              </label>
              <AnimatedButton
                type="button"
                variant="danger"
                className="!px-2 !py-1 ml-2"
                onClick={() => removeVolume(idx)}
                icon={null}
              >
                Remove
              </AnimatedButton>
            </div>
          ))}
          <AnimatedButton
            type="button"
            onClick={addVolume}
            icon={<FaPlus />}
            variant="primary"
            className="mt-2"
          >
            Add Volume
          </AnimatedButton>
          <div className="text-xs text-zinc-400 mt-2">
            Volumes are provisioned as PersistentVolumeClaims (PVCs) and are
            suitable for multi-node, multi-cluster Kubernetes environments.
          </div>
        </div>
        <div className="flex gap-4 mt-4">
          <AnimatedButton
            type="submit"
            disabled={loading}
            className="!px-6 !py-2"
            icon={<FaPlus />}
          >
            {loading ? "Adding..." : "Add Application"}
          </AnimatedButton>
          <AnimatedButton
            type="button"
            variant="secondary"
            className="!px-6 !py-2"
            onClick={() => setDockerModalOpen(true)}
          >
            Dockerize
          </AnimatedButton>
        </div>
      </form>
    </>
  );
}
