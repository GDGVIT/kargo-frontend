import React from "react";

interface ResourceLimitDetails {
  cpu: string;
  memory: string;
}

interface ResourceLimits {
  allowed: {
    requests: ResourceLimitDetails;
    limits: ResourceLimitDetails;
  };
  usage: {
    requests: ResourceLimitDetails;
    limits: ResourceLimitDetails;
  };
}

interface ResourceDetails {
  cpu?: string;
  memory?: string;
}

interface Resources {
  requests?: ResourceDetails;
  limits?: ResourceDetails;
}

interface ResourcesSectionProps {
  resourceLimits: ResourceLimits;
  resources: Resources;
  handleResourceChange: (
    section: "requests" | "limits",
    field: "cpu" | "memory",
    value: string
  ) => void;
}

const ResourcesSection: React.FC<ResourcesSectionProps> = ({
  resourceLimits,
  resources,
  handleResourceChange,
}) => (
  <div className="mb-6">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Resources
    </label>
    {resourceLimits && (
      <div className="text-xs text-gray-500 mb-3 space-y-1">
        <div>
          Allowed Requests:{" "}
          <span className="font-semibold">
            CPU {resourceLimits.allowed.requests.cpu}
          </span>
          ,{" "}
          <span className="font-semibold">
            Memory {resourceLimits.allowed.requests.memory}Mi
          </span>
        </div>
        <div>
          Used:{" "}
          <span className="font-semibold">
            CPU {resourceLimits.usage.requests.cpu}
          </span>
          ,{" "}
          <span className="font-semibold">
            Memory {resourceLimits.usage.requests.memory}Mi
          </span>
        </div>
        <div>
          Allowed Limits:{" "}
          <span className="font-semibold">
            CPU {resourceLimits.allowed.limits.cpu}
          </span>
          ,{" "}
          <span className="font-semibold">
            Memory {resourceLimits.allowed.limits.memory}Mi
          </span>
        </div>
        <div>
          Used:{" "}
          <span className="font-semibold">
            CPU {resourceLimits.usage.limits.cpu}
          </span>
          ,{" "}
          <span className="font-semibold">
            Memory {resourceLimits.usage.limits.memory}Mi
          </span>
        </div>
      </div>
    )}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <div className="text-xs text-gray-600 mb-1">CPU Requests</div>
        <input
          value={resources?.requests?.cpu || ""}
          onChange={(e) =>
            handleResourceChange("requests", "cpu", e.target.value)
          }
          placeholder="100m"
          className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 text-sm"
        />
      </div>
      <div>
        <div className="text-xs text-gray-600 mb-1">Memory Requests</div>
        <input
          value={resources?.requests?.memory || ""}
          onChange={(e) =>
            handleResourceChange("requests", "memory", e.target.value)
          }
          placeholder="128Mi"
          className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 text-sm"
        />
      </div>
      <div>
        <div className="text-xs text-gray-600 mb-1">CPU Limits</div>
        <input
          value={resources?.limits?.cpu || ""}
          onChange={(e) =>
            handleResourceChange("limits", "cpu", e.target.value)
          }
          placeholder="500m"
          className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 text-sm"
        />
      </div>
      <div>
        <div className="text-xs text-gray-600 mb-1">Memory Limits</div>
        <input
          value={resources?.limits?.memory || ""}
          onChange={(e) =>
            handleResourceChange("limits", "memory", e.target.value)
          }
          placeholder="512Mi"
          className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 text-sm"
        />
      </div>
    </div>
  </div>
);

export default ResourcesSection;
