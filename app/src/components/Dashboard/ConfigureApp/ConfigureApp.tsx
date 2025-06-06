"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "../../../utils/api";
import type { Application } from "../../../types/Application";

interface Port {
  id: string;
  containerPort: number;
  hostPort: number;
  protocol: "TCP" | "UDP";
  description?: string;
}

interface AppPort {
  name?: string;
  containerPort: number;
  protocol?: string;
  ingressEnabled?: boolean;
  subdomain?: string;
  ingressHost?: string;
  hostPort?: number;
  description?: string;
}
import ImageFields from "./ImageFields";
import EnvVarsSection from "./EnvVarsSection";
import ResourcesSection from "./ResourcesSection";
import PortsSection from "./PortsSection";
import ActionButtons from "./ActionButtons";
import ErrorMessage from "./ErrorMessage";
import { useNotification } from "../../Notification/Notification";

export default function ConfigureApp({ appId }: { appId: string }) {
  const [form, setForm] = useState<Application | null>(null);
  const [envList, setEnvList] = useState<[string, string][]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [resourceLimits, setResourceLimits] = useState<{
    allowed: {
      requests: { cpu: number; memory: number };
      limits: { cpu: number; memory: number };
    };
    usage: {
      requests: { cpu: number; memory: number };
      limits: { cpu: number; memory: number };
    };
  } | null>(null);
  const router = useRouter();
  const { notify } = useNotification();

  useEffect(() => {
    fetchApp();
    // eslint-disable-next-line
  }, [appId]);

  useEffect(() => {
    async function fetchLimits() {
      try {
        const res = await axios.get("/api/users/me/resource-usage");
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
      setError("Failed to load app");
      notify("Failed to load app", "error");
    }
  }

  async function handleSaveAndDeploy(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      if (!form) return;
      const envObj = envList.reduce(
        (acc, [k, v]) => (k ? { ...acc, [k]: v } : acc),
        {} as Record<string, string>
      );
      const updatedPorts = form.ports || [];

      if (resourceLimits) {
        function parse(val: string | undefined) {
          if (!val) return 0;
          if (val.endsWith("m")) return parseInt(val) / 1000;
          if (val.endsWith("Mi")) return parseInt(val);
          if (val.endsWith("Gi")) return parseInt(val) * 1024;
          return parseFloat(val);
        }
        const newUsage = { ...resourceLimits.usage };

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
          setError("Resource allocation exceeds your allowed quota.");
          setSaving(false);
          return;
        }
      }
      // Save
      await axios.put(`/api/applications/${appId}`, {
        ...form,
        env: envObj,
        ports: updatedPorts,
      });
      // Deploy
      await axios.post(`/api/applications/${appId}/apply`);
      fetchApp();
      notify("Application saved and deployed successfully!", "success");
    } catch (err) {
      const error = err as unknown as {
        response?: { data?: { message?: string } };
      };
      if (error?.response?.data?.message) setError(error.response.data.message);
      else setError("Failed to save & deploy");
      notify(
        error?.response?.data?.message || "Failed to save & deploy",
        "error"
      );
    }
    setSaving(false);
  }

  async function handleDelete() {
    if (
      !window.confirm(
        "Are you sure you want to delete this application and all its resources? This cannot be undone."
      )
    )
      return;
    setSaving(true);
    setError("");
    try {
      await axios.delete(`/api/applications/${appId}/delete-all`);
      notify("Application and all resources deleted!", "success");
      router.push("/dashboard");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Failed to delete application");
      notify("Failed to delete application", "error");
    }
    setSaving(false);
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
    field: "cpu" | "memory",
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

  if (!form)
    return <div className="text-center text-gray-300">App not found</div>;
  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-900 rounded-lg shadow-md mt-8 border border-gray-800">
      <button
        type="button"
        onClick={() => router.push("/dashboard")}
        className="flex items-center gap-2 text-gray-400 hover:text-blue-400 font-medium mb-6 transition-colors"
      >
        <span className="text-lg">←</span> Back to Dashboard
      </button>
      <h1 className="text-2xl font-bold mb-6 text-gray-100">
        Configure <span className="text-blue-400">{form?.name}</span>
      </h1>
      <form onSubmit={handleSaveAndDeploy} className="space-y-6">
        <ImageFields
          imageUrl={form?.imageUrl || ""}
          imageTag={form?.imageTag || ""}
          setImageUrl={(url) =>
            setForm((f) => (f ? { ...f, imageUrl: url } : f))
          }
          setImageTag={(tag) =>
            setForm((f) => (f ? { ...f, imageTag: tag } : f))
          }
        />
        <EnvVarsSection
          envList={envList}
          handleEnvChange={handleEnvChange}
          addEnvVar={addEnvVar}
          removeEnvVar={removeEnvVar}
        />
        <ResourcesSection
          resourceLimits={
            resourceLimits
              ? {
                  allowed: {
                    requests: {
                      cpu: String(resourceLimits.allowed.requests.cpu),
                      memory: String(resourceLimits.allowed.requests.memory),
                    },
                    limits: {
                      cpu: String(resourceLimits.allowed.limits.cpu),
                      memory: String(resourceLimits.allowed.limits.memory),
                    },
                  },
                  usage: {
                    requests: {
                      cpu: String(resourceLimits.usage.requests.cpu),
                      memory: String(resourceLimits.usage.requests.memory),
                    },
                    limits: {
                      cpu: String(resourceLimits.usage.limits.cpu),
                      memory: String(resourceLimits.usage.limits.memory),
                    },
                  },
                }
              : {
                  allowed: {
                    requests: { cpu: "0", memory: "0" },
                    limits: { cpu: "0", memory: "0" },
                  },
                  usage: {
                    requests: { cpu: "0", memory: "0" },
                    limits: { cpu: "0", memory: "0" },
                  },
                }
          }
          resources={form?.resources || { requests: {}, limits: {} }}
          handleResourceChange={handleResourceChange}
        />
        <PortsSection
          ports={(form?.ports ?? []).map((port, idx) => {
            const p = port as AppPort;
            return {
              id: `${idx}-${p.containerPort}`,
              containerPort: p.containerPort,
              hostPort:
                typeof p.hostPort === "number"
                  ? p.hostPort
                  : p.containerPort ?? 80,
              protocol: p.protocol === "UDP" ? "UDP" : "TCP",
              description:
                typeof p.description === "string" ? p.description : "",
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
        <ActionButtons
          saving={saving}
          onSaveAndDeploy={handleSaveAndDeploy}
          onDelete={handleDelete}
        />
        <ErrorMessage error={error} />
      </form>
    </div>
  );
}
