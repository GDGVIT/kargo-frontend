"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "../../../utils/api";
import type Application from "../../../types/Application/Application";
import type Port from "../../../types/Application/Port/Port";
import type AppPort from "../../../types/Application/AppPort/AppPort";
import type RegistryCredential from "../../../types/Registry/RegistryCredential/RegistryCredential";
import ImageFields from "./ImageFields/ImageFields";
import EnvVarsSection from "./EnvVarsSection/EnvVarsSection";
import ResourcesSection from "./ResourcesSection/ResourcesSection";
import PortsSection from "./PortsSection/PortsSection";
import ActionButtons from "./ActionButtons/ActionButtons";
import useNotification from "../../ui/Notification/Notification";
import Modal from "../../ui/Modal/Modal";
import AnimatedButton from "../../ui/AnimatedButton/AnimatedButton";
import {
  FaDatabase,
  FaDocker,
  FaLeaf,
  FaNetworkWired,
  FaChartArea,
} from "react-icons/fa";
import Loader from "../../ui/Loader/Loader";
import { useAuth } from "../../Auth/AuthProvider/AuthProvider";
import Tabs, { TabItem } from "../../ui/Tabs/Tabs";
import MetricsSection from "./MetricsSection/MetricsSection";
import { GrCloudSoftware } from "react-icons/gr";
import Input from "../../ui/Input/Input";
import Select from "../../ui/Select/Select";
import { FaPlus } from "react-icons/fa";

export default function ConfigureApp({ appId }: { appId: string }) {
  const { user } = useAuth();
  const [form, setForm] = useState<Application | null>(null);
  const [envList, setEnvList] = useState<[string, string][]>([]);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true); // <-- add loading state
  const [resourceLimits, setResourceLimits] = useState<{
    allowed: {
      requests: { cpuMilli: number; memoryMB: number; storageGB: number };
      limits: { cpuMilli: number; memoryMB: number; storageGB: number };
    };
    usage: {
      requests: { cpuMilli: number; memoryMB: number; storageGB: number };
      limits: { cpuMilli: number; memoryMB: number; storageGB: number };
    };
  } | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [activeTab, setActiveTab] = useState("Image");
  const [credentials, setCredentials] = useState<RegistryCredential[]>([]);
  const [selectedCredential, setSelectedCredential] =
    useState<RegistryCredential | null>(null);
  const [volumes, setVolumes] = useState(form?.volumes || []);
  const router = useRouter();
  const { notify } = useNotification();

  useEffect(() => {
    setLoading(true); // set loading true before fetch
    fetchApp();
    fetchCredentials();
    // eslint-disable-next-line
  }, [appId]);

  // Sync selectedCredential with loaded app
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
        const res = await axios.get("/api/users/me/resource-usage");
        // Use backend field names directly
        setResourceLimits(res.data);
      } catch {
        setResourceLimits(null);
      }
    }
    fetchLimits();
  }, []);

  async function fetchApp() {
    try {
      const res = await axios.get(`/api/applications/${appId}`);
      const app = res.data.application;
      setForm({
        ...app,
        resources: app.resources || { requests: {}, limits: {} },
        ports: app.ports || [],
      });
      setEnvList(app.env ? Object.entries(app.env) : []);
    } catch {
      setForm(null); // explicit
      notify("Failed to load app", "error");
    } finally {
      setLoading(false); // set loading false after fetch
    }
  }

  async function fetchCredentials() {
    try {
      const res = await axios.get("/api/users/me/credentials");
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
      const envObj = envList.reduce(
        (acc, [k, v]) => (k ? { ...acc, [k]: v } : acc),
        {} as Record<string, string>
      );
      const updatedPorts = form.ports || [];

      if (resourceLimits) {
        function parse(val: string | number | undefined) {
          if (val === undefined || val === null || val === "") return 0;
          if (typeof val === "number") return val;
          if (typeof val !== "string") return 0;
          if (val.endsWith("m")) return parseInt(val) / 1000;
          if (val.endsWith("Mi")) return parseInt(val);
          if (val.endsWith("Gi")) return parseInt(val) * 1024;
          return parseFloat(val);
        }
        // Clone the usage object
        const newUsage = {
          requests: { ...resourceLimits.usage.requests },
          limits: { ...resourceLimits.usage.limits },
        };

        if (form.resources) {
          newUsage.requests.cpuMilli -= parse(
            form.resources.requests?.cpuMilli
          );
          newUsage.requests.memoryMB -= parse(
            form.resources.requests?.memoryMB
          );
          newUsage.limits.cpuMilli -= parse(form.resources.limits?.cpuMilli);
          newUsage.limits.memoryMB -= parse(form.resources.limits?.memoryMB);
        }

        const reqCpu = parse(form.resources?.requests?.cpuMilli);
        const reqMem = parse(form.resources?.requests?.memoryMB);
        const limCpu = parse(form.resources?.limits?.cpuMilli);
        const limMem = parse(form.resources?.limits?.memoryMB);
        newUsage.requests.cpuMilli += reqCpu;
        newUsage.requests.memoryMB += reqMem;
        newUsage.limits.cpuMilli += limCpu;
        newUsage.limits.memoryMB += limMem;
        if (
          newUsage.requests.cpuMilli >
            resourceLimits.allowed.requests.cpuMilli ||
          newUsage.requests.memoryMB >
            resourceLimits.allowed.requests.memoryMB ||
          newUsage.limits.cpuMilli > resourceLimits.allowed.limits.cpuMilli ||
          newUsage.limits.memoryMB > resourceLimits.allowed.limits.memoryMB
        ) {
          notify("Resource allocation exceeds your allowed quota.", "error");
          setSaving(false);
          return;
        }
      }
      // Directly use the values from form.resources with correct keys for backend
      const directResources = {
        requests: {
          cpuMilli: form.resources?.requests?.cpuMilli,
          memoryMB: form.resources?.requests?.memoryMB,
          storageGB: form.resources?.requests?.storageGB,
        },
        limits: {
          cpuMilli: form.resources?.limits?.cpuMilli,
          memoryMB: form.resources?.limits?.memoryMB,
          storageGB: form.resources?.limits?.storageGB,
        },
      };
      await axios.put(`/api/applications/${appId}`, {
        ...form,
        env: envObj,
        ports: updatedPorts,
        credentials: selectedCredential ? [selectedCredential] : [],
        resources: directResources,
        volumes: volumes.length > 0 ? volumes : undefined,
      });
      await axios.post(`/api/applications/${appId}/apply`);
      fetchApp();
      notify("Application saved and deployed successfully!", "success");
    } catch (err) {
      const error = err as unknown as {
        response?: { data?: { message?: string } };
      };
      console.error(err); // Log the error for debugging
      if (error?.response?.data?.message)
        notify(error.response.data.message, "error");
      else notify("Failed to save & deploy", "error");
    }
    setSaving(false);
  }

  async function handleDelete() {
    setSaving(true);
    try {
      await axios.delete(`/api/applications/${appId}`);
      notify("Application and all resources deleted!", "success");
      router.push("/applications");
    } catch (err) {
      notify("Failed to delete application", "error");
      console.log(err);
    }
    setSaving(false);
    setShowDeleteModal(false);
  }

  function handleEnvChange(idx: number, key: string, value: string) {
    setEnvList((prev) =>
      prev.map((pair, i) => (i === idx ? [key, value] : pair))
    );
  }
  function addEnvVar() {
    setEnvList((prev) => [...prev, ["", ""]]);
  }
  function removeEnvVar(idx: number) {
    setEnvList((prev) => prev.filter((_, i) => i !== idx));
  }

  function handleResourceChange(
    section: "requests" | "limits",
    field: "cpuMilli" | "memoryMB" | "storageGB",
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

  useEffect(() => {
    if (form?.volumes) setVolumes(form.volumes);
  }, [form]);

  function handleVolumeChange(
    idx: number,
    key: string,
    value: string | boolean | string[]
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

  if (loading || saving) {
    return <Loader />;
  }

  if (!form && !loading) {
    return <div className="text-center text-gray-400 ">App not found</div>;
  }

  const metricTabs: TabItem[] = [
    {
      key: "CPUMetrics",
      label: (
        <span className="flex items-center gap-2">
          <FaChartArea className="text-blue-400" /> CPU
        </span>
      ),
      heading: "CPU Metrics",
      subheading: "View CPU usage metrics for your application",
      content: <MetricsSection appId={appId} metricType="cpu" />,
    },
    {
      key: "MemoryMetrics",
      label: (
        <span className="flex items-center gap-2">
          <FaChartArea className="text-green-400" /> Memory
        </span>
      ),
      heading: "Memory Metrics",
      subheading: "View memory usage metrics for your application",
      content: <MetricsSection appId={appId} metricType="memory" />,
    },
    {
      key: "StorageMetrics",
      label: (
        <span className="flex items-center gap-2">
          <FaChartArea className="text-orange-400" /> Storage
        </span>
      ),
      heading: "Storage Metrics",
      subheading: "View storage usage metrics for your application",
      content: <MetricsSection appId={appId} metricType="storage" />,
    },
  ];

  const tabItems: TabItem[] = [
    {
      key: "Image",
      label: (
        <span className="flex items-center gap-2">
          <FaDocker className="text-blue-300" /> Image
        </span>
      ),
      heading: "Image Configuration",
      subheading: "Configure the Docker image for your application",
      content: (
        <ImageFields
          imageUrl={form?.imageUrl || ""}
          imageTag={form?.imageTag || ""}
          setImageUrl={(url) =>
            setForm((f) => (f ? { ...f, imageUrl: url } : f))
          }
          setImageTag={(tag) =>
            setForm((f) => (f ? { ...f, imageTag: tag } : f))
          }
          credentials={credentials}
          selectedCredential={selectedCredential?.name || ""}
          setSelectedCredential={(name) => {
            const cred = credentials.find((c) => c.name === name) || null;
            setSelectedCredential(cred);
          }}
        />
      ),
    },
    {
      key: "Env",
      label: (
        <span className="flex items-center gap-2">
          <FaLeaf className="text-green-400" /> Environment
        </span>
      ),
      heading: "Environment Variables",
      subheading: "Set environment variables for your application",
      content: (
        <EnvVarsSection
          envList={envList}
          handleEnvChange={handleEnvChange}
          addEnvVar={addEnvVar}
          removeEnvVar={removeEnvVar}
        />
      ),
    },
    {
      key: "Resources",
      label: (
        <span className="flex items-center gap-2">
          <FaDatabase className="text-blue-300" /> Resources
        </span>
      ),
      heading: "Resources",
      subheading: "Configure resource limits for your application",
      content: (
        <ResourcesSection
          resourceLimits={
            resourceLimits || {
              allowed: {
                requests: { cpuMilli: 0, memoryMB: 0, storageGB: 0 },
                limits: { cpuMilli: 0, memoryMB: 0, storageGB: 0 },
              },
              usage: {
                requests: { cpuMilli: 0, memoryMB: 0, storageGB: 0 },
                limits: { cpuMilli: 0, memoryMB: 0, storageGB: 0 },
              },
            }
          }
          resources={form?.resources || { requests: {}, limits: {} }}
          handleResourceChange={handleResourceChange}
        />
      ),
    },
    {
      key: "Ports",
      label: (
        <span className="flex items-center gap-2">
          <FaNetworkWired className="text-yellow-300" /> Ports
        </span>
      ),
      heading: "Ports Configuration",
      subheading: "Configure ports for your application",
      content: (
        <PortsSection
          ports={(form?.ports ?? []).map((port, idx) => {
            const p = port as AppPort;
            return {
              id: `${idx}-${p.containerPort}`,
              containerPort: p.containerPort,
              protocol: p.protocol === "UDP" ? "UDP" : "TCP",
              subdomain: p.subdomain || "",
            } as Port;
          })}
          onChange={(updatedPorts) => {
            setForm((f) =>
              f
                ? {
                    ...f,
                    ports: updatedPorts.map((port) => {
                      const { ...rest } = port;
                      return { ...rest };
                    }),
                  }
                : f
            );
          }}
        />
      ),
    },
    {
      key: "Volumes",
      label: (
        <span className="flex items-center gap-2">
          <FaDatabase className="text-purple-400" /> Volumes
        </span>
      ),
      heading: "Persistent Volumes (PVCs)",
      subheading:
        "Attach persistent storage to your application using Kubernetes PVCs.",
      content: (
        <div className="mt-2">
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
      ),
    },
    ...metricTabs,
  ];

  return (
    <div>
      <h2 className="text-gray-100" style={{ marginTop: "0" }}>
        <GrCloudSoftware className="inline-block mr-2 text-2xl" />
        {user && user.username ? <span>{user.username} / </span> : null}
        {form?.name}
      </h2>
      <div className="flex flex-col gap-4 mb-4 justify-end items-end">
        <ActionButtons
          saving={saving}
          onSaveAndDeploy={handleSaveAndDeploy}
          onRequestDelete={() => setShowDeleteModal(true)}
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
          Are you sure you want to delete this application and all its
          resources? This cannot be undone.
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
            {saving ? "Deleting..." : "Delete"}
          </AnimatedButton>
        </div>
      </Modal>
    </div>
  );
}
