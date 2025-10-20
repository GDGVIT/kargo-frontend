'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/utils/api';
import type Application from '@/types/Application/Application';
import type RegistryCredential from '@/types/Registry/RegistryCredential/RegistryCredential';
import { useAuth } from '@/components/Auth/AuthProvider/AuthProvider';
import { Tabs, TabItem, Modal, useNotification, AnimatedButton, Loader } from '@/components/ui';
import OverviewTab from './OverviewTab/OverviewTab';
import SetupTab from './SetupTab/SetupTab';
import SettingsTab from './SettingsTab/SettingsTab';
import ActionButtons from './ActionButtons/ActionButtons';
import useImageTest from '@/hooks/useImageTest';
import ImageTestErrorModal from '@/components/Docker/ImageTestErrorModal/ImageTestErrorModal';

export default function ConfigureApp({ appId }: { appId: string }) {
  const { user } = useAuth();
  const [form, setForm] = useState<Application | null>(null);
  const [envList, setEnvList] = useState<[string, string][]>([]);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [resourceLimits, setResourceLimits] = useState<{
    allowed: {
      requests: { cpu: number; memory: number; storage: number };
      limits: { cpu: number; memory: number; storage: number };
    };
    usage: {
      requests: { cpu: number; memory: number; storage: number };
      limits: { cpu: number; memory: number; storage: number };
    };
  } | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [activeTab, setActiveTab] = useState('Overview');
  const [credentials, setCredentials] = useState<RegistryCredential[]>([]);
  const [selectedCredential, setSelectedCredential] = useState<RegistryCredential | null>(null);
  const { testImage, lastResult } = useImageTest();
  const [showImageErrorModal, setShowImageErrorModal] = useState(false);
  const router = useRouter();
  const { notify } = useNotification();

  useEffect(() => {
    setLoading(true);
    fetchApp();
    fetchCredentials();
    // eslint-disable-next-line
  }, [appId]);

  useEffect(() => {
    const credName =
      Array.isArray(form?.credentials) && form.credentials.length > 0
        ? form.credentials[0].name
        : null;
    if (credName) {
      const cred = credentials.find((c) => c.name === credName);
      setSelectedCredential(cred || null);
    } else {
      setSelectedCredential(null);
    }
  }, [form, credentials]);

  useEffect(() => {
    async function fetchLimits() {
      try {
        const res = await api.get('/api/users/me/resource-usage');

        setResourceLimits(res.data);
      } catch {
        setResourceLimits(null);
      }
    }
    fetchLimits();
  }, []);

  async function fetchApp() {
    try {
      const res = await api.get(`/api/applications/${appId}`);
      const app = res.data.application;
      setForm({
        ...app,
        resources: app.resources || { requests: {}, limits: {} },
        ports: app.ports || [],
      });
      setEnvList(app.env ? Object.entries(app.env) : []);
    } catch {
      setForm(null);
      notify('Failed to load app', 'error');
    } finally {
      setLoading(false);
    }
  }

  async function fetchCredentials() {
    try {
      const res = await api.get('/api/users/me/credentials');
      setCredentials(res.data.credentials || []);
    } catch {
      setCredentials([]);
    }
  }

  async function handleSaveAndDeploy(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      if (!form) return;

      const imageTag = form.imageTag || 'latest';
      const credentialIds = selectedCredential
        ? [`${selectedCredential.name}:${selectedCredential.registryType}`]
        : undefined;
      const imageTestResult = await testImage(form.imageUrl, imageTag, credentialIds);

      if (!imageTestResult.available) {
        setShowImageErrorModal(true);
        setSaving(false);
        return;
      }

      let finalNodeSelector = form.nodeSelector || {};
      if (imageTestResult.recommendedNodeSelector) {
        finalNodeSelector = {
          ...finalNodeSelector,
          ...imageTestResult.recommendedNodeSelector,
        };
      }

      const envObj = envList.reduce(
        (acc, [k, v]) => (k ? { ...acc, [k]: v } : acc),
        {} as Record<string, string>
      );
      const updatedPorts = (form.ports || []).map((p, idx) => ({
        name: p.name || `port${idx}`,
        containerPort: Number(p.containerPort),
        protocol: p.protocol || 'TCP',
        subdomain: p.subdomain || '',
      }));

      if (resourceLimits) {
        function parse(val: string | number | undefined) {
          if (val === undefined || val === null || val === '') return 0;
          if (typeof val === 'number') return val;
          if (typeof val !== 'string') return 0;
          if (val.endsWith('m')) return parseInt(val) / 1000;
          if (val.endsWith('Mi')) return parseInt(val);
          if (val.endsWith('Gi')) return parseInt(val) * 1024;
          return parseFloat(val);
        }

        const newUsage = {
          requests: { ...resourceLimits.usage.requests },
          limits: { ...resourceLimits.usage.limits },
        };

        if (form.resources) {
          newUsage.requests.cpu -= parse(form.resources.requests?.cpu);
          newUsage.requests.memory -= parse(form.resources.requests?.memory);
          newUsage.limits.cpu -= parse(form.resources.limits?.cpu);
          newUsage.limits.memory -= parse(form.resources.limits?.memory);
        }

        const reqCpu = parse(form.resources?.requests?.cpu);
        const reqMem = parse(form.resources?.requests?.memory);
        const limCpu = parse(form.resources?.limits?.cpu);
        const limMem = parse(form.resources?.limits?.memory);
        newUsage.requests.cpu += reqCpu;
        newUsage.requests.memory += reqMem;
        newUsage.limits.cpu += limCpu;
        newUsage.limits.memory += limMem;
        if (
          newUsage.requests.cpu > resourceLimits.allowed.requests.cpu ||
          newUsage.requests.memory > resourceLimits.allowed.requests.memory ||
          newUsage.limits.cpu > resourceLimits.allowed.limits.cpu ||
          newUsage.limits.memory > resourceLimits.allowed.limits.memory
        ) {
          notify('Resource allocation exceeds your allowed quota.', 'error');
          setSaving(false);
          return;
        }
      }

      const directResources = {
        requests: {
          cpu: form.resources?.requests?.cpu,
          memory: form.resources?.requests?.memory,
          storage: form.resources?.requests?.storage,
        },
        limits: {
          cpu: form.resources?.limits?.cpu,
          memory: form.resources?.limits?.memory,
          storage: form.resources?.limits?.storage,
        },
      };
      await api.put(`/api/applications/${appId}`, {
        ...form,
        env: envObj,
        ports: updatedPorts,
        credentials: selectedCredential ? [selectedCredential] : [],
        resources: directResources,
        nodeSelector: finalNodeSelector,
      });
      await api.post(`/api/applications/${appId}/apply`);
      fetchApp();
      notify('Application saved and deployed successfully!', 'success');
    } catch (err) {
      const error = err as unknown as {
        response?: { data?: { message?: string } };
      };
      console.error(err);
      if (error?.response?.data?.message) notify(error.response.data.message, 'error');
      else notify('Failed to save & deploy', 'error');
    }
    setSaving(false);
  }

  async function handleDelete() {
    setSaving(true);
    try {
      await api.delete(`/api/applications/${appId}`);
      notify('Application and all resources deleted!', 'success');
      router.push('/applications');
    } catch (err) {
      notify('Failed to delete application', 'error');
      console.log(err);
    }
    setSaving(false);
    setShowDeleteModal(false);
  }

  async function handleRemoveDeployment() {
    if (!form?._id) return;
    setSaving(true);
    try {
      await api.post(`/api/applications/${form._id}/scale-zero`);
      notify('Deployment scaled to 0 (removed)', 'success');
    } catch {
      notify('Failed to remove deployment', 'error');
    }
    setSaving(false);
  }

  async function handleRolloutRestart() {
    if (!form?._id) return;
    setSaving(true);
    try {
      await api.post(`/api/applications/${form._id}/rollout-restart`);
      notify('Deployment restarted', 'success');
    } catch {
      notify('Failed to restart deployment', 'error');
    }
    setSaving(false);
  }

  function handleEnvChange(idx: number, key: string, value: string) {
    setEnvList((prev) => prev.map((pair, i) => (i === idx ? [key, value] : pair)));
  }
  function addEnvVar() {
    setEnvList((prev) => [...prev, ['', '']]);
  }
  function removeEnvVar(idx: number) {
    setEnvList((prev) => prev.filter((_, i) => i !== idx));
  }

  function handleResourceChange(
    section: 'requests' | 'limits',
    field: 'cpu' | 'memory' | 'storage',
    value: string
  ) {
    setForm((f) =>
      f
        ? {
            ...f,
            resources: {
              ...f.resources,
              [section]: {
                ...((f.resources && f.resources[section]) || {}),
                [field]: value,
              },
            },
          }
        : f
    );
  }

  if (loading || saving) {
    return <Loader />;
  }

  if (!form && !loading) {
    return <div className="text-center text-gray-400 ">App not found</div>;
  }

  const tabItems: TabItem[] = [
    {
      key: 'Overview',
      label: <span className="flex flex-row justify-center items-center">Overview</span>,
      heading: 'Overview',
      subheading: 'Application overview and metrics',
      content: <OverviewTab appId={appId} form={form} resources={form?.resources} />,
    },
    {
      key: 'Setup',
      label: <span className="flex flex-row justify-center items-center">Setup</span>,
      heading: 'Setup',
      subheading: 'Configure environment, ports, and resources',
      content: (
        <SetupTab
          envList={envList}
          handleEnvChange={handleEnvChange}
          addEnvVar={addEnvVar}
          removeEnvVar={removeEnvVar}
          ports={form?.ports || []}
          onPortsChange={(
            updatedPorts: import('../../../types/Application/Port/Port').default[]
          ) => {
            setForm((f) => (f ? { ...f, ports: updatedPorts } : f));
          }}
          resourceLimits={resourceLimits}
          resources={form?.resources || { requests: {}, limits: {} }}
          handleResourceChange={handleResourceChange}
        />
      ),
    },
    {
      key: 'Settings',
      label: <span className="flex flex-row justify-center items-center">Settings</span>,
      heading: 'Settings',
      subheading: 'Image and credential settings',
      content: (
        <SettingsTab
          imageUrl={form?.imageUrl || ''}
          imageTag={form?.imageTag || ''}
          setImageUrl={(url) => setForm((f) => (f ? { ...f, imageUrl: url } : f))}
          setImageTag={(tag) => setForm((f) => (f ? { ...f, imageTag: tag } : f))}
          credentials={credentials}
          selectedCredential={
            selectedCredential
              ? `${selectedCredential.name}:${selectedCredential.registryType}`
              : ''
          }
          setSelectedCredential={(value) => {
            if (!value) {
              setSelectedCredential(null);
              return;
            }
            const [credName, registryType] = value.split(':');
            const cred =
              credentials.find((c) => c.name === credName && c.registryType === registryType) ||
              null;
            setSelectedCredential(cred);
          }}
        />
      ),
    },
  ];

  return (
    <div>
      <h2 className="text-gray-100" style={{ marginTop: '0' }}>
        {user && user.username ? <span>{user.username} / </span> : null}
        {form?.name}
      </h2>
      <div className="flex flex-col gap-4 mb-4 justify-end items-end">
        <ActionButtons
          saving={saving}
          onSaveAndDeploy={handleSaveAndDeploy}
          onRequestDelete={() => setShowDeleteModal(true)}
          onRemoveDeployment={handleRemoveDeployment}
          onRolloutRestart={handleRolloutRestart}
        />
      </div>
      <Tabs tabs={tabItems} activeTab={activeTab} setActiveTab={setActiveTab} />
      <form onSubmit={handleSaveAndDeploy} className="hidden" />
      <Modal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Application"
      >
        <div className="text-red-200 mb-4 text-base font-medium">
          Are you sure you want to delete this application and all its resources? This cannot be
          undone.
        </div>
        <div className="flex gap-3 justify-end">
          <AnimatedButton
            onClick={() => setShowDeleteModal(false)}
            className="!bg-gray-800 hover:!bg-gray-700 !text-gray-200 !border !border-gray-700"
            icon={null}
            title="Cancel"
            variant="secondary"
          >
            Cancel
          </AnimatedButton>
          <AnimatedButton
            onClick={handleDelete}
            className="font-semibold !border !border-red-700 !shadow-md"
            disabled={saving}
            icon={null}
            title="Delete"
            variant="danger"
          >
            {saving ? 'Deleting...' : 'Delete'}
          </AnimatedButton>
        </div>
      </Modal>
      <ImageTestErrorModal
        open={showImageErrorModal}
        onClose={() => setShowImageErrorModal(false)}
        error={lastResult?.error || ''}
        imageUrl={form?.imageUrl || ''}
        imageTag={form?.imageTag || 'latest'}
        needsAuth={lastResult?.needsAuth}
        authTested={lastResult?.authTested}
        suggestions={lastResult?.suggestions}
        available={lastResult?.available}
        isArchitectureIssue={lastResult?.isArchitectureIssue}
        onNavigateToCredentials={() => router.push('/credentials')}
      />
    </div>
  );
}
