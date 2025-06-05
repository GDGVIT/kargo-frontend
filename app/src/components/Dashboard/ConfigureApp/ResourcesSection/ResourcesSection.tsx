import React from "react";

interface FormResources {
  requests?: {
    cpu?: string;
    memory?: string;
  };
  limits?: {
    cpu?: string;
    memory?: string;
  };
}

interface ResourceMetric {
  cpu: string;
  memory: string;
}

interface ResourceLimits {
  allowed: {
    requests: ResourceMetric;
    limits: ResourceMetric;
  };
  usage: {
    requests: ResourceMetric;
    limits: ResourceMetric;
  };
}

interface ResourcesSectionProps {
  form: { resources?: FormResources };
  resourceLimits: ResourceLimits;
  handleResourceChange: (
    section: "requests" | "limits",
    field: "cpu" | "memory",
    value: string
  ) => void;
}

const ResourcesSection: React.FC<ResourcesSectionProps> = ({
  form,
  resourceLimits,
  handleResourceChange,
}) => (
  <div>
    <label className="mb-1 font-medium">Resources</label>
    {resourceLimits && (
      <div className="mb-2 text-xs text-gray-400">
        Allowed Requests: CPU {resourceLimits.allowed.requests.cpu}, Memory{" "}
        {resourceLimits.allowed.requests.memory}Mi
        <br />
        Used: CPU {resourceLimits.usage.requests.cpu}, Memory{" "}
        {resourceLimits.usage.requests.memory}Mi
        <br />
        Allowed Limits: CPU {resourceLimits.allowed.limits.cpu}, Memory{" "}
        {resourceLimits.allowed.limits.memory}Mi
        <br />
        Used: CPU {resourceLimits.usage.limits.cpu}, Memory{" "}
        {resourceLimits.usage.limits.memory}Mi
      </div>
    )}
    <div className="grid grid-cols-2 gap-4">
      <div>
        <div className="text-xs text-gray-400 mb-1">CPU Requests</div>
        <input
          className="w-full p-2 rounded  border border-gray-700 text-sm"
          value={form.resources?.requests?.cpu || ""}
          onChange={(e) =>
            handleResourceChange("requests", "cpu", e.target.value)
          }
          placeholder="100m"
        />
      </div>
      <div>
        <div className="text-xs text-gray-400 mb-1">Memory Requests</div>
        <input
          className="w-full p-2 rounded  border border-gray-700 text-sm"
          value={form.resources?.requests?.memory || ""}
          onChange={(e) =>
            handleResourceChange("requests", "memory", e.target.value)
          }
          placeholder="128Mi"
        />
      </div>
      <div>
        <div className="text-xs text-gray-400 mb-1">CPU Limits</div>
        <input
          className="w-full p-2 rounded  border border-gray-700 text-sm"
          value={form.resources?.limits?.cpu || ""}
          onChange={(e) =>
            handleResourceChange("limits", "cpu", e.target.value)
          }
          placeholder="500m"
        />
      </div>
      <div>
        <div className="text-xs text-gray-400 mb-1">Memory Limits</div>
        <input
          className="w-full p-2 rounded  border border-gray-700 text-sm"
          value={form.resources?.limits?.memory || ""}
          onChange={(e) =>
            handleResourceChange("limits", "memory", e.target.value)
          }
          placeholder="512Mi"
        />
      </div>
    </div>
  </div>
);

export default ResourcesSection;
