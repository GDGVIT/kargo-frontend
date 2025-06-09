"use client";

import { useEffect, useState } from "react";
import axios from "../../utils/api";
import useNotification from "../ui/Notification/Notification";
import type RegistryCredential from "../../types/Registry/RegistryCredential/RegistryCredential";
import CredentialRegister from "./CredentialRegister/CredentialRegister";
import CredentialList from "./CredentialList/CredentialList";

export default function Credentials({
  onSelect,
}: {
  onSelect?: (cred: RegistryCredential) => void;
}) {
  const [credentials, setCredentials] = useState<RegistryCredential[]>([]);
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

  const handleAdd = async (form: RegistryCredential) => {
    setLoading(true);
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
      await fetchCredentials();
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
      await fetchCredentials();
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
      <CredentialRegister onAdd={handleAdd} loading={loading} />
      <CredentialList
        credentials={credentials}
        loading={loading}
        onDelete={handleDelete}
        onSelect={onSelect}
        confirmDelete={confirmDelete}
        setConfirmDelete={setConfirmDelete}
      />
    </div>
  );
}
