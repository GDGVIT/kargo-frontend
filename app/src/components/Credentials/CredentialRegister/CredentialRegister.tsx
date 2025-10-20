import { useState } from 'react';
import { Input, Select, AnimatedButton } from '@/components/ui';
import type RegistryType from '@/types/Registry/RegistryType/RegistryType';
import type RegistryCredential from '@/types/Registry/RegistryCredential/RegistryCredential';
import { RiAddLargeFill } from 'react-icons/ri';
import { SiDocker, SiGithub, SiGitlab } from 'react-icons/si';
import { FiBox } from 'react-icons/fi';

export default function CredentialRegister({
  onAdd,
  loading,
}: {
  onAdd: (form: RegistryCredential) => Promise<void>;
  loading: boolean;
}) {
  const [form, setForm] = useState<RegistryCredential>({
    name: '',
    registryType: 'dockerhub',
    username: '',
    token: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onAdd(form);
    setForm({ name: '', registryType: 'dockerhub', username: '', token: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      <Input
        required
        id="cred-name"
        label="Name"
        value={form.name}
        onChange={(val) => setForm((f) => ({ ...f, name: val }))}
        placeholder="e.g. DockerHub Personal"
        title="Credential Name"
      />
      <Select
        label="Registry"
        value={form.registryType}
        onChange={(value) =>
          setForm((f) => ({
            ...f,
            registryType: value as RegistryType,
          }))
        }
        options={[
          {
            value: 'dockerhub',
            label: 'Docker Hub',
            icon: <SiDocker className="w-4 h-4" />,
          },
          {
            value: 'github',
            label: 'GitHub',
            icon: <SiGithub className="w-4 h-4" />,
          },
          {
            value: 'gitlab',
            label: 'GitLab',
            icon: <SiGitlab className="w-4 h-4" />,
          },
          {
            value: 'other',
            label: 'Other',
            icon: <FiBox className="w-4 h-4" />,
          },
        ]}
      />
      <Input
        required
        id="cred-username"
        label="Username"
        title="Registry Username"
        value={form.username}
        onChange={(val) => setForm((f) => ({ ...f, username: val }))}
        placeholder="Registry username"
      />
      <Input
        required
        id="cred-token"
        label="Personal Access Token"
        title="Personal Access Token"
        value={form.token}
        onChange={(val) => setForm((f) => ({ ...f, token: val }))}
        type="password"
        placeholder="Personal access token"
      />
      <div className="md:col-span-2 flex justify-end">
        <AnimatedButton type="submit" disabled={loading} icon={<RiAddLargeFill />}>
          {loading ? 'Saving...' : 'Add Credential'}
        </AnimatedButton>
      </div>
    </form>
  );
}
