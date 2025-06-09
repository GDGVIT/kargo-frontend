import { useState } from "react";
import type RegistryType from "../../../types/Registry/RegistryType/RegistryType";
import type RegistryCredential from "../../../types/Registry/RegistryCredential/RegistryCredential";
import Input from "../../ui/Input/Input";
import Select from "../../ui/Select/Select";

export default function CredentialRegister({
  onAdd,
  loading,
}: {
  onAdd: (form: RegistryCredential) => Promise<void>;
  loading: boolean;
}) {
  const [form, setForm] = useState<RegistryCredential>({
    name: "",
    registryType: "dockerhub",
    username: "",
    token: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onAdd(form);
    setForm({ name: "", registryType: "dockerhub", username: "", token: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
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
  );
}
