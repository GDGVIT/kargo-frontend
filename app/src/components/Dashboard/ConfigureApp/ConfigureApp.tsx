"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "../../../utils/api";
import type { Application } from "../../../types/Application";
import { useAuth } from "../../Auth/AuthProvider/AuthProvider";
import ImageFields from "./ImageFields";
import EnvVarsSection from "./EnvVarsSection";
import ResourcesSection from "./ResourcesSection";
import PortsSection from "./PortsSection";
import IngressHostField from "./IngressHostField";
import ActionButtons from "./ActionButtons";
import ErrorMessage from "./ErrorMessage";

const getBaseDomain = () => {
  let domain = process.env.NEXT_PUBLIC_INGRESS_BASE_DOMAIN || "vitians.in";
  if (domain.startsWith(".")) domain = domain.slice(1);
  return domain;
};

export default function ConfigureApp({ appId }: { appId: string }) {
  const { user } = useAuth();
  const [form, setForm] = useState<Application | null>(null);
  const [envList, setEnvList] = useState<[string, string][]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [subdomains, setSubdomains] = useState<string[]>([]);
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
    setLoading(true);
    try {
      const res = await axios.get(`/api/applications/${appId}`);
      const app = res.data.application;
      setForm({
        ...app,
        resources: app.resources || { requests: {}, limits: {} },
        ports: app.ports || [],
      });
      setEnvList(app.env ? Object.entries(app.env) : []);
      // Load subdomains from ingress.subdomains if present, else default to empty strings
      setSubdomains(
        app.ingress?.subdomains
          ? app.ports?.map(
              (port: {
                containerPort: number;
                name?: string;
                protocol?: string;
              }) => {
                const found = Object.entries(app.ingress.subdomains).find(
                  ([, p]) => p === port.containerPort
                );
                return found ? found[0] : "";
              }
            )
          : (app.ports || []).map(() => "")
      );
    } catch {
      setError("Failed to load app");
    }
    setLoading(false);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      if (!form) return;
      const envObj = envList.reduce(
        (acc, [k, v]) => (k ? { ...acc, [k]: v } : acc),
        {} as Record<string, string>
      );
      // Build subdomain mapping: subdomain -> containerPort
      const subdomainMap: Record<string, number> = {};
      subdomains.forEach((sub, idx) => {
        if (sub && form.ports && form.ports[idx]) {
          subdomainMap[sub] = form.ports[idx].containerPort;
        }
      });
      // Check resource limits before sending
      if (resourceLimits) {
        function parse(val: string | undefined) {
          if (!val) return 0;
          if (val.endsWith("m")) return parseInt(val) / 1000;
          if (val.endsWith("Mi")) return parseInt(val);
          if (val.endsWith("Gi")) return parseInt(val) * 1024;
          return parseFloat(val);
        }
        const newUsage = { ...resourceLimits.usage };
        // Subtract this app's current resources if editing
        if (form.resources) {
          newUsage.requests.cpu -= parse(form.resources.requests?.cpu);
          newUsage.requests.memory -= parse(form.resources.requests?.memory);
          newUsage.limits.cpu -= parse(form.resources.limits?.cpu);
          newUsage.limits.memory -= parse(form.resources.limits?.memory);
        }
        // Add the new values
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
      await axios.put(`/api/applications/${appId}`, {
        ...form,
        env: envObj,
        ports: (form.ports || []).map((port, idx) => ({
          ...port,
          subdomain: subdomains[idx] || "",
        })),
        ingress: {
          ...(form.ingress || {}),
          host: form.ingress?.host || "",
        },
      });
      fetchApp();
    } catch (err) {
      const error = err as unknown as {
        response?: { data?: { message?: string } };
      };
      if (error?.response?.data?.message) setError(error.response.data.message);
      else setError("Failed to save");
    }
    setSaving(false);
  }

  async function removeDeployment() {
    setSaving(true);
    setError("");
    try {
      await axios.post(`/api/applications/${appId}/remove-deployment`);
      fetchApp();
    } catch {
      setError("Failed to remove deployment");
    }
    setSaving(false);
  }
  async function removeNamespace() {
    setSaving(true);
    setError("");
    try {
      await axios.post(`/api/applications/${appId}/remove-namespace`);
      fetchApp();
    } catch {
      setError("Failed to remove namespace");
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

  function handlePortChange(
    idx: number,
    field: string,
    value: string | boolean
  ) {
    setForm((f) =>
      f
        ? {
            ...f,
            ports: (f.ports ?? []).map((port, i) =>
              i === idx
                ? {
                    ...port,
                    [field]:
                      field === "containerPort"
                        ? Number(value)
                        : field === "ingressEnabled"
                        ? Boolean(value)
                        : value,
                  }
                : port
            ),
          }
        : f
    );
  }
  function handleSubdomainChange(idx: number, value: string) {
    setSubdomains((prev) => prev.map((s, i) => (i === idx ? value : s)));
  }
  function addPort() {
    setForm((f) =>
      f
        ? {
            ...f,
            ports: [
              ...(f.ports ?? []),
              { containerPort: 80, name: "", protocol: "TCP" },
            ],
          }
        : f
    );
    setSubdomains((prev) => [...prev, ""]);
  }
  function removePort(idx: number) {
    setForm((f) =>
      f ? { ...f, ports: (f.ports ?? []).filter((_, i) => i !== idx) } : f
    );
    setSubdomains((prev) => prev.filter((_, i) => i !== idx));
  }

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center  text-white animate-fade-in">
        Loading...
      </div>
    );
  if (!form)
    return (
      <div className="min-h-screen flex items-center justify-center  text-white animate-fade-in">
        App not found
      </div>
    );
  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center  text-white animate-fade-in">
        User not found
      </div>
    );

  return (
    <div className="min-h-screen  text-white p-6 flex flex-col items-center animate-fade-in">
      <button
        onClick={() => router.push("/dashboard")}
        className="mb-8 text-blue-400 hover:underline text-lg self-start"
      >
        ← Back to Dashboard
      </button>
      <h1 className="text-3xl font-extrabold mb-6 tracking-tight drop-shadow-lg animate-fade-in">
        Configure <span className="text-blue-400">{form.name}</span>
      </h1>
      <form
        onSubmit={handleSave}
        className="bg-gray-900/90 backdrop-blur rounded-xl shadow-2xl p-8 w-full max-w-2xl space-y-8 animate-slide-in border border-gray-800"
      >
        <ImageFields
          imageUrl={form.imageUrl}
          imageTag={form.imageTag}
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
          resources={form.resources || { requests: {}, limits: {} }}
          handleResourceChange={handleResourceChange}
        />
        <PortsSection
          ports={form.ports ?? []}
          subdomains={subdomains}
          user={user}
          getBaseDomain={getBaseDomain}
          handlePortChange={handlePortChange}
          handleSubdomainChange={handleSubdomainChange}
          addPort={addPort}
          removePort={removePort}
        />
        <IngressHostField host={form.ingress?.host || ""} />
        <ActionButtons
          saving={saving}
          onSave={handleSave}
          onApply={async () => {
            setSaving(true);
            setError("");
            try {
              const res = await axios.post(`/api/applications/${appId}/apply`);
              alert(res.data.message || "Application applied successfully");
            } catch (err) {
              const error = err as unknown as {
                response?: { data?: { message?: string } };
              };
              setError(
                error?.response?.data?.message || "Failed to apply application"
              );
            }
            setSaving(false);
          }}
          onRemoveDeployment={removeDeployment}
          onRemoveNamespace={removeNamespace}
        />
        <ErrorMessage error={error} />
      </form>
    </div>
  );
}
