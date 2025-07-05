import React from "react";
import Input from "../../../../ui/Input/Input";
import {
  formatCpu,
  formatMemory,
  formatStorage,
} from "../../../../../utils/resources";
import type Resource from "../../../../../types/Application/Resource/Resource";

export interface ResourceLimits {
  allowed: {
    requests: { cpuMilli: number; memoryMB: number; storageGB: number };
    limits: { cpuMilli: number; memoryMB: number; storageGB: number };
  };
  usage: {
    requests: { cpuMilli: number; memoryMB: number; storageGB: number };
    limits: { cpuMilli: number; memoryMB: number; storageGB: number };
  };
}

interface ResourcesSectionProps {
  resourceLimits: ResourceLimits | null;
  resources: {
    requests?: Resource;
    limits?: Resource;
  };
  handleResourceChange: (
    section: "requests" | "limits",
    field: "cpuMilli" | "memoryMB" | "storageGB",
    value: string
  ) => void;
}

const ResourcesSection: React.FC<ResourcesSectionProps> = ({
  resourceLimits,
  resources,
  handleResourceChange,
}) => {
  // Log allowed resources to the console when resourceLimits is present
  React.useEffect(() => {
    if (resourceLimits && resourceLimits.allowed) {
      // Only log once per change
      console.log("Allowed resources:", resourceLimits.allowed);
    }
  }, [resourceLimits]);

  return (
    <div className="mb-6">
      {resourceLimits && (
        <div className="text-xs text-gray-400 mb-3 space-y-1">
          <div>
            Allowed Requests:
            <span className="font-semibold">
              {" "}
              {formatCpu(resourceLimits.allowed.requests.cpuMilli)}{" "}
            </span>
            ,
            <span className="font-semibold">
              {" "}
              {formatMemory(resourceLimits.allowed.requests.memoryMB)}{" "}
            </span>
            ,
            <span className="font-semibold">
              {formatStorage(resourceLimits.allowed.requests.storageGB)}
            </span>
          </div>
          <div>
            Used:
            <span className="font-semibold">
              {" "}
              {formatCpu(resourceLimits.usage.requests.cpuMilli)}{" "}
            </span>
            ,
            <span className="font-semibold">
              {" "}
              {formatMemory(resourceLimits.usage.requests.memoryMB)}{" "}
            </span>
            ,
            <span className="font-semibold">
              {formatStorage(resourceLimits.usage.requests.storageGB)}
            </span>
          </div>
          <div>
            Allowed Limits:
            <span className="font-semibold">
              {" "}
              {formatCpu(resourceLimits.allowed.limits.cpuMilli)}{" "}
            </span>
            ,
            <span className="font-semibold">
              {" "}
              {formatMemory(resourceLimits.allowed.limits.memoryMB)}{" "}
            </span>
            ,
            <span className="font-semibold">
              {formatStorage(resourceLimits.allowed.limits.storageGB)}
            </span>
          </div>
          <div>
            Used:
            <span className="font-semibold">
              {" "}
              {formatCpu(resourceLimits.usage.limits.cpuMilli)}{" "}
            </span>
            ,
            <span className="font-semibold">
              {" "}
              {formatMemory(resourceLimits.usage.limits.memoryMB)}{" "}
            </span>
            ,
            <span className="font-semibold">
              {formatStorage(resourceLimits.usage.limits.storageGB)}
            </span>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center gap-1">
            <Input
              value={
                resources?.requests?.cpuMilli !== undefined &&
                resources?.requests?.cpuMilli !== null
                  ? resources.requests.cpuMilli.toString()
                  : ""
              }
              onChange={(val) => {
                handleResourceChange("requests", "cpuMilli", val);
              }}
              placeholder="100"
              inputMode="numeric"
              pattern="[0-9]*"
              label="CPU Requests"
              className="!mb-0"
              type="number"
              unitType="cpu"
              displayHelperText
            />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1">
            <Input
              value={
                resources?.requests?.memoryMB !== undefined &&
                resources?.requests?.memoryMB !== null
                  ? resources.requests.memoryMB.toString()
                  : ""
              }
              onChange={(val) => {
                handleResourceChange("requests", "memoryMB", val);
              }}
              placeholder="256"
              inputMode="numeric"
              pattern="[0-9]*"
              label="Memory Requests"
              className="!mb-0"
              type="number"
              unitType="memory"
              displayHelperText
            />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1">
            <Input
              value={
                resources?.requests?.storageGB !== undefined &&
                resources?.requests?.storageGB !== null
                  ? resources.requests.storageGB.toString()
                  : ""
              }
              onChange={(val) => {
                handleResourceChange("requests", "storageGB", val);
              }}
              placeholder="10"
              inputMode="numeric"
              pattern="[0-9]*"
              label="Storage Requests"
              className="!mb-0"
              type="number"
              unitType="storage"
              displayHelperText
            />
          </div>
        </div>
        {/* Limits Section */}
        <div>
          <div className="flex items-center gap-1">
            <Input
              value={
                resources?.limits?.cpuMilli !== undefined &&
                resources?.limits?.cpuMilli !== null
                  ? resources.limits.cpuMilli.toString()
                  : ""
              }
              onChange={(val) => {
                handleResourceChange("limits", "cpuMilli", val);
              }}
              placeholder="200"
              inputMode="numeric"
              pattern="[0-9]*"
              label="CPU Limits"
              className="!mb-0"
              type="number"
              unitType="cpu"
              displayHelperText
            />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1">
            <Input
              value={
                resources?.limits?.memoryMB !== undefined &&
                resources?.limits?.memoryMB !== null
                  ? resources.limits.memoryMB.toString()
                  : ""
              }
              onChange={(val) => {
                handleResourceChange("limits", "memoryMB", val);
              }}
              placeholder="512"
              inputMode="numeric"
              pattern="[0-9]*"
              label="Memory Limits"
              className="!mb-0"
              type="number"
              unitType="memory"
              displayHelperText
            />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1">
            <Input
              value={
                resources?.limits?.storageGB !== undefined &&
                resources?.limits?.storageGB !== null
                  ? resources.limits.storageGB.toString()
                  : ""
              }
              onChange={(val) => {
                handleResourceChange("limits", "storageGB", val);
              }}
              placeholder="20"
              inputMode="numeric"
              pattern="[0-9]*"
              label="Storage Limits"
              className="!mb-0"
              type="number"
              unitType="storage"
              displayHelperText
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcesSection;
