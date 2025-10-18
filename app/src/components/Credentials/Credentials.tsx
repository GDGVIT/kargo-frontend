'use client';

import { useEffect, useState } from 'react';
import api from '../../utils/api';
import useNotification from '../ui/Notification/Notification';
import type RegistryCredential from '../../types/Registry/RegistryCredential/RegistryCredential';
import CredentialRegister from './CredentialRegister/CredentialRegister';
import CredentialList from './CredentialList/CredentialList';

export default function Credentials() {
  const [credentials, setCredentials] = useState<RegistryCredential[]>([]);
  const [loading, setLoading] = useState(false);
  const { notify } = useNotification();
  const [confirmDelete, setConfirmDelete] = useState<RegistryCredential | null>(null);

  const fetchCredentials = async () => {
    setLoading(true);
    try {
      const res = await api.get('/api/users/me/credentials');
      setCredentials(res.data.credentials);
    } catch {
      notify('Failed to load credentials', 'error');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCredentials();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAdd = async (form: RegistryCredential) => {
    setLoading(true);
    if (credentials.some((c) => c.name === form.name && c.registryType === form.registryType)) {
      notify('Credential with this name and registry type already exists.', 'warning');
      setLoading(false);
      return;
    }
    try {
      await api.post('/api/users/me/credentials', form);
      await fetchCredentials();
      notify('Credential added successfully!', 'success');
    } catch {
      notify('Failed to save credential', 'error');
    }
    setLoading(false);
  };

  const handleDelete = async (cred: RegistryCredential) => {
    setLoading(true);
    try {
      await api.delete('/api/users/me/credentials', {
        data: { name: cred.name, registryType: cred.registryType },
      });
      await fetchCredentials();
      notify('Credential deleted successfully!', 'success');
    } catch {
      notify('Failed to delete credential', 'error');
    }
    setLoading(false);
    setConfirmDelete(null);
  };

  return (
    <section className="w-full max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto px-2 sm:px-4 md:px-6">
      <CredentialRegister onAdd={handleAdd} loading={loading} />
      <CredentialList
        credentials={credentials}
        loading={loading}
        onDelete={handleDelete}
        confirmDelete={confirmDelete}
        setConfirmDelete={setConfirmDelete}
      />
    </section>
  );
}
