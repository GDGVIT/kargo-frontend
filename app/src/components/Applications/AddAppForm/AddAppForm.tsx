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
      });
      setForm({ name: "", imageUrl: "", imageTag: "", credentials: [] });
      notify("Application added successfully!", "success");
      router.push("/applications");
    } catch {
      notify("Failed to add app", "error");
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleAdd} className="mb-8 space-y-4 min-h-[470px]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Input
            required
            label="Name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="My App"
          />
        </div>
        <div>
          <Input
            required
            label="Image URL"
            value={form.imageUrl}
            onChange={(e) =>
              setForm((f) => ({ ...f, imageUrl: e.target.value }))
            }
            placeholder="registry.io/my-app"
            helperText={
              <a
                href="/dockerize"
                className="underline text-yellow-300 hover:text-yellow-200 ml-1 text-xs"
              >
                Dockerize your app
              </a>
            }
          />
        </div>
        <div>
          <Input
            required
            label="Image Tag"
            value={form.imageTag}
            onChange={(e) =>
              setForm((f) => ({ ...f, imageTag: e.target.value }))
            }
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
      <AnimatedButton
        type="submit"
        disabled={loading}
        className="mt-4 !px-6 !py-2"
        icon={<FaPlus />}
      >
        {loading ? "Adding..." : "Add Application"}
      </AnimatedButton>
    </form>
  );
}
