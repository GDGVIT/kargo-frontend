import React from "react";
import Input from "../../../ui/Input/Input";
import {
  formatCpu,
  formatMemory,
  formatStorage,
} from "../../../../utils/resources";

import type ResourcesSectionProps from "../../../../types/Application/Resources/ResourcesSectionProps/ResourcesSectionProps";

const sanitizeNumber = (val: string) => val.replace(/[^\d.]/g, "");

const ResourcesSection: React.FC<ResourcesSectionProps> = ({
  resourceLimits,
  resources,
  handleResourceChange,
}) => {
  const cpuUnitOptions = ["m", "vCPU"];
  const memoryUnitOptions = ["MB", "GB"];
  const storageUnitOptions = ["MB", "GB", "TB"];

  // Helper to extract unit from value
  const extractUnit = (
    val: string | number | undefined,
    defaultUnit: string
  ) => {
    if (typeof val === "string") {
      const match = val.match(/[a-zA-Z]+$/);
      return match ? match[0] : defaultUnit;
    }
    return defaultUnit;
  };

  // Helper to strip unit from value
  const stripUnit = (val: string | number | undefined, unit: string) => {
    if (val === undefined || val === null || val === "") return "";
    const strVal = String(val);
    return strVal.endsWith(unit)
      ? strVal.slice(0, -unit.length)
      : strVal.replace(/[a-zA-Z]+$/, "");
  };

  const [cpuRequestsUnit, setCpuRequestsUnit] = React.useState(
    extractUnit(resources?.requests?.cpu, "m")
  );
  const [cpuLimitsUnit, setCpuLimitsUnit] = React.useState(
    extractUnit(resources?.limits?.cpu, "m")
  );
  const [memoryRequestsUnit, setMemoryRequestsUnit] = React.useState(
    extractUnit(resources?.requests?.memory, "Mi")
  );
  const [memoryLimitsUnit, setMemoryLimitsUnit] = React.useState(
    extractUnit(resources?.limits?.memory, "Mi")
  );
  const [storageRequestsUnit, setStorageRequestsUnit] = React.useState(
    extractUnit(resources?.requests?.storage, "Gi")
  );
  const [storageLimitsUnit, setStorageLimitsUnit] = React.useState(
    extractUnit(resources?.limits?.storage, "Gi")
  );

  return (
    <div className="mb-6">
      {resourceLimits && (
        <div className="text-xs text-gray-400 mb-3 space-y-1">
          {/* Allowed Requests */}
          <div>
            Allowed Requests:
            <span className="font-semibold">
              {" "}
              CPU {formatCpu(resourceLimits.allowed.requests.cpu)}{" "}
            </span>
            ,
            <span className="font-semibold">
              {" "}
              Memory {formatMemory(resourceLimits.allowed.requests.memory)}{" "}
            </span>
            ,
            <span className="font-semibold">
              {" "}
              Storage {formatStorage(
                resourceLimits.allowed.requests.storage
              )}{" "}
            </span>
          </div>
          {/* Used Requests */}
          <div>
            Used:
            <span className="font-semibold">
              {" "}
              CPU {formatCpu(resourceLimits.usage.requests.cpu)}{" "}
            </span>
            ,
            <span className="font-semibold">
              {" "}
              Memory {formatMemory(resourceLimits.usage.requests.memory)}{" "}
            </span>
            ,
            <span className="font-semibold">
              {" "}
              Storage {formatStorage(
                resourceLimits.usage.requests.storage
              )}{" "}
            </span>
          </div>
          {/* Allowed Limits */}
          <div>
            Allowed Limits:
            <span className="font-semibold">
              {" "}
              CPU {formatCpu(resourceLimits.allowed.limits.cpu)}{" "}
            </span>
            ,
            <span className="font-semibold">
              {" "}
              Memory {formatMemory(resourceLimits.allowed.limits.memory)}{" "}
            </span>
            ,
            <span className="font-semibold">
              {" "}
              Storage {formatStorage(
                resourceLimits.allowed.limits.storage
              )}{" "}
            </span>
          </div>
          {/* Used Limits */}
          <div>
            Used:
            <span className="font-semibold">
              {" "}
              CPU {formatCpu(resourceLimits.usage.limits.cpu)}{" "}
            </span>
            ,
            <span className="font-semibold">
              {" "}
              Memory {formatMemory(resourceLimits.usage.limits.memory)}{" "}
            </span>
            ,
            <span className="font-semibold">
              {" "}
              Storage {formatStorage(resourceLimits.usage.limits.storage)}{" "}
            </span>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center gap-1">
            <Input
              value={stripUnit(resources?.requests?.cpu, cpuRequestsUnit)}
              onChange={(e) => {
                const sanitized = sanitizeNumber(e.target.value);
                handleResourceChange(
                  "requests",
                  "cpu",
                  sanitized ? sanitized + cpuRequestsUnit : ""
                );
              }}
              placeholder="100"
              inputMode="numeric"
              pattern="[0-9]*"
              label="CPU Requests"
              className="!mb-0"
              helperText={formatCpu(resources?.requests?.cpu)}
              unitSelect={{
                value: cpuRequestsUnit,
                options: cpuUnitOptions,
                onChange: (unit) => {
                  setCpuRequestsUnit(unit);
                  const sanitized = stripUnit(
                    resources?.requests?.cpu,
                    cpuRequestsUnit
                  );
                  handleResourceChange(
                    "requests",
                    "cpu",
                    sanitized ? sanitized + unit : ""
                  );
                },
                disabled: false,
              }}
            />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1">
            <Input
              value={stripUnit(resources?.requests?.memory, memoryRequestsUnit)}
              onChange={(e) => {
                const sanitized = sanitizeNumber(e.target.value);
                handleResourceChange(
                  "requests",
                  "memory",
                  sanitized ? sanitized + memoryRequestsUnit : ""
                );
              }}
              placeholder="256"
              inputMode="numeric"
              pattern="[0-9]*"
              label="Memory Requests"
              className="!mb-0"
              helperText={formatMemory(resources?.requests?.memory)}
              unitSelect={{
                value: memoryRequestsUnit,
                options: memoryUnitOptions,
                onChange: (unit) => {
                  setMemoryRequestsUnit(unit);
                  const sanitized = stripUnit(
                    resources?.requests?.memory,
                    memoryRequestsUnit
                  );
                  handleResourceChange(
                    "requests",
                    "memory",
                    sanitized ? sanitized + unit : ""
                  );
                },
                disabled: false,
              }}
            />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1">
            <Input
              value={stripUnit(
                resources?.requests?.storage,
                storageRequestsUnit
              )}
              onChange={(e) => {
                const sanitized = sanitizeNumber(e.target.value);
                handleResourceChange(
                  "requests",
                  "storage",
                  sanitized ? sanitized + storageRequestsUnit : ""
                );
              }}
              placeholder="10"
              inputMode="numeric"
              pattern="[0-9]*"
              label="Storage Requests"
              className="!mb-0"
              helperText={formatStorage(resources?.requests?.storage)}
              unitSelect={{
                value: storageRequestsUnit,
                options: storageUnitOptions,
                onChange: (unit) => {
                  setStorageRequestsUnit(unit);
                  const sanitized = stripUnit(
                    resources?.requests?.storage,
                    storageRequestsUnit
                  );
                  handleResourceChange(
                    "requests",
                    "storage",
                    sanitized ? sanitized + unit : ""
                  );
                },
                disabled: false,
              }}
            />
          </div>
        </div>
        {/* Limits Section */}
        <div>
          <div className="flex items-center gap-1">
            <Input
              value={stripUnit(resources?.limits?.cpu, cpuLimitsUnit)}
              onChange={(e) => {
                const sanitized = sanitizeNumber(e.target.value);
                handleResourceChange(
                  "limits",
                  "cpu",
                  sanitized ? sanitized + cpuLimitsUnit : ""
                );
              }}
              placeholder="200"
              inputMode="numeric"
              pattern="[0-9]*"
              label="CPU Limits"
              className="!mb-0"
              helperText={formatCpu(resources?.limits?.cpu)}
              unitSelect={{
                value: cpuLimitsUnit,
                options: cpuUnitOptions,
                onChange: (unit) => {
                  setCpuLimitsUnit(unit);
                  const sanitized = stripUnit(
                    resources?.limits?.cpu,
                    cpuLimitsUnit
                  );
                  handleResourceChange(
                    "limits",
                    "cpu",
                    sanitized ? sanitized + unit : ""
                  );
                },
                disabled: false,
              }}
            />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1">
            <Input
              value={stripUnit(resources?.limits?.memory, memoryLimitsUnit)}
              onChange={(e) => {
                const sanitized = sanitizeNumber(e.target.value);
                handleResourceChange(
                  "limits",
                  "memory",
                  sanitized ? sanitized + memoryLimitsUnit : ""
                );
              }}
              placeholder="512"
              inputMode="numeric"
              pattern="[0-9]*"
              label="Memory Limits"
              className="!mb-0"
              helperText={formatMemory(resources?.limits?.memory)}
              unitSelect={{
                value: memoryLimitsUnit,
                options: memoryUnitOptions,
                onChange: (unit) => {
                  setMemoryLimitsUnit(unit);
                  const sanitized = stripUnit(
                    resources?.limits?.memory,
                    memoryLimitsUnit
                  );
                  handleResourceChange(
                    "limits",
                    "memory",
                    sanitized ? sanitized + unit : ""
                  );
                },
                disabled: false,
              }}
            />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1">
            <Input
              value={stripUnit(resources?.limits?.storage, storageLimitsUnit)}
              onChange={(e) => {
                const sanitized = sanitizeNumber(e.target.value);
                handleResourceChange(
                  "limits",
                  "storage",
                  sanitized ? sanitized + storageLimitsUnit : ""
                );
              }}
              placeholder="20"
              inputMode="numeric"
              pattern="[0-9]*"
              label="Storage Limits"
              className="!mb-0"
              helperText={formatStorage(resources?.limits?.storage)}
              unitSelect={{
                value: storageLimitsUnit,
                options: storageUnitOptions,
                onChange: (unit) => {
                  setStorageLimitsUnit(unit);
                  const sanitized = stripUnit(
                    resources?.limits?.storage,
                    storageLimitsUnit
                  );
                  handleResourceChange(
                    "limits",
                    "storage",
                    sanitized ? sanitized + unit : ""
                  );
                },
                disabled: false,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcesSection;
