import React, { useState } from "react";

interface AppCreateFormProps {
  onCreate: (data: {
    name: string;
    imageUrl: string;
    imageTag: string;
    registryToken: string;
  }) => Promise<void>;
  loading: boolean;
  onCancel: () => void;
}

const AppCreateForm: React.FC<AppCreateFormProps> = ({
  onCreate,
  loading,
  onCancel,
}) => {
  const [form, setForm] = useState({
    name: "",
    imageUrl: "",
    imageTag: "latest",
    registryToken: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.imageUrl || !form.imageTag || !form.registryToken) {
      setError("All fields are required");
      return;
    }
    setError(null);
    await onCreate(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        className="input"
        placeholder="Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        disabled={loading}
      />
      <input
        className="input"
        placeholder="Image URL"
        name="imageUrl"
        value={form.imageUrl}
        onChange={handleChange}
        disabled={loading}
      />
      <input
        className="input"
        placeholder="Image Tag"
        name="imageTag"
        value={form.imageTag}
        onChange={handleChange}
        disabled={loading}
      />
      <input
        className="input"
        placeholder="Registry Token"
        name="registryToken"
        value={form.registryToken}
        onChange={handleChange}
        disabled={loading}
      />
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <div className="flex gap-2 justify-end">
        <button
          type="button"
          className="btn"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          Add Application
        </button>
      </div>
    </form>
  );
};

export default AppCreateForm;
