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
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Resource Usage Overview
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <div className="font-medium text-gray-600 dark:text-gray-400 mb-2">
                Requests
              </div>
              <div className="space-y-1 text-gray-500 dark:text-gray-500">
                <div>
                  Allowed: {formatCpu(resourceLimits.allowed.requests.cpuMilli)}
                  , {formatMemory(resourceLimits.allowed.requests.memoryMB)},{" "}
                  {formatStorage(resourceLimits.allowed.requests.storageGB)}
                </div>
                <div>
                  Used: {formatCpu(resourceLimits.usage.requests.cpuMilli)},{" "}
                  {formatMemory(resourceLimits.usage.requests.memoryMB)},{" "}
                  {formatStorage(resourceLimits.usage.requests.storageGB)}
                </div>
              </div>
            </div>
            <div>
              <div className="font-medium text-gray-600 dark:text-gray-400 mb-2">
                Limits
              </div>
              <div className="space-y-1 text-gray-500 dark:text-gray-500">
                <div>
                  Allowed: {formatCpu(resourceLimits.allowed.limits.cpuMilli)},{" "}
                  {formatMemory(resourceLimits.allowed.limits.memoryMB)},{" "}
                  {formatStorage(resourceLimits.allowed.limits.storageGB)}
                </div>
                <div>
                  Used: {formatCpu(resourceLimits.usage.limits.cpuMilli)},{" "}
                  {formatMemory(resourceLimits.usage.limits.memoryMB)},{" "}
                  {formatStorage(resourceLimits.usage.limits.storageGB)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {/* Resource Requests Section */}
        <div>
          <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            Resource Requests
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Minimum guaranteed resources for your application
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              label="CPU"
              className="!mb-0"
              type="number"
              unitType="cpu"
              displayHelperText
            />
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
              label="Memory"
              className="!mb-0"
              type="number"
              unitType="memory"
              displayHelperText
            />
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
              label="Storage"
              className="!mb-0"
              type="number"
              unitType="storage"
              displayHelperText
            />
          </div>
        </div>

        {/* Resource Limits Section */}
        <div>
          <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            Resource Limits
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Maximum resources your application can use
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              label="CPU"
              className="!mb-0"
              type="number"
              unitType="cpu"
              displayHelperText
            />
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
              label="Memory"
              className="!mb-0"
              type="number"
              unitType="memory"
              displayHelperText
            />
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
              label="Storage"
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
