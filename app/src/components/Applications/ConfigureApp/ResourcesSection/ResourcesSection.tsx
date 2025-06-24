import React from "react";
import Input from "../../../ui/Input/Input";
import {
  formatCpu,
  formatMemory,
  formatStorage,
  parseMemory,
  parseStorage,
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
    if (typeof val === "string" && val.trim() !== "") {
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

  function useResourceInput(
    resourceValue: string | number | undefined,
    defaultUnit: string
  ) {
    // Detect unit from value, fallback to default
    const detectedUnit = extractUnit(resourceValue, defaultUnit);
    const [unit, setUnit] = React.useState(detectedUnit);
    const [value, setValue] = React.useState(
      stripUnit(resourceValue, detectedUnit)
    );

    // Sync with external changes
    React.useEffect(() => {
      const newUnit = extractUnit(resourceValue, defaultUnit);
      setUnit(newUnit);
      setValue(stripUnit(resourceValue, newUnit));
    }, [resourceValue, defaultUnit]);

    return [value, setValue, unit, setUnit] as const;
  }

  // CPU Requests
  const [
    cpuRequestsValue,
    setCpuRequestsValue,
    cpuRequestsUnit,
    setCpuRequestsUnit,
  ] = useResourceInput(resources?.requests?.cpu, "m");
  // CPU Limits
  const [cpuLimitsValue, setCpuLimitsValue, cpuLimitsUnit, setCpuLimitsUnit] =
    useResourceInput(resources?.limits?.cpu, "m");
  // Memory Requests
  const [
    memoryRequestsValue,
    setMemoryRequestsValue,
    memoryRequestsUnit,
    setMemoryRequestsUnit,
  ] = useResourceInput(resources?.requests?.memory, "MB");
  // Memory Limits
  const [
    memoryLimitsValue,
    setMemoryLimitsValue,
    memoryLimitsUnit,
    setMemoryLimitsUnit,
  ] = useResourceInput(resources?.limits?.memory, "MB");
  // Storage Requests
  const [
    storageRequestsValue,
    setStorageRequestsValue,
    storageRequestsUnit,
    setStorageRequestsUnit,
  ] = useResourceInput(resources?.requests?.storage, "GB");
  // Storage Limits
  const [
    storageLimitsValue,
    setStorageLimitsValue,
    storageLimitsUnit,
    setStorageLimitsUnit,
  ] = useResourceInput(resources?.limits?.storage, "GB");

  return (
    <div className="mb-6">
      {resourceLimits && (
        <div className="text-xs text-gray-400 mb-3 space-y-1">
          {/* Allowed Requests */}
          <div>
            Allowed Requests:
            <span className="font-semibold">
              {" "}
              CPU {formatCpu(Number(resourceLimits.allowed.requests.cpu))}{" "}
            </span>
            ,
            <span className="font-semibold">
              {" "}
              Memory{" "}
              {formatMemory(
                Number(resourceLimits.allowed.requests.memory)
              )}{" "}
            </span>
            ,
            <span className="font-semibold">
              {" "}
              Storage{" "}
              {formatStorage(
                Number(resourceLimits.allowed.requests.storage)
              )}{" "}
            </span>
          </div>
          {/* Used Requests */}
          <div>
            Used:
            <span className="font-semibold">
              {" "}
              CPU {formatCpu(Number(resourceLimits.usage.requests.cpu))}{" "}
            </span>
            ,
            <span className="font-semibold">
              {" "}
              Memory{" "}
              {formatMemory(Number(resourceLimits.usage.requests.memory))}{" "}
            </span>
            ,
            <span className="font-semibold">
              {" "}
              Storage{" "}
              {formatStorage(
                Number(resourceLimits.usage.requests.storage)
              )}{" "}
            </span>
          </div>
          {/* Allowed Limits */}
          <div>
            Allowed Limits:
            <span className="font-semibold">
              {" "}
              CPU {formatCpu(Number(resourceLimits.allowed.limits.cpu))}{" "}
            </span>
            ,
            <span className="font-semibold">
              {" "}
              Memory{" "}
              {formatMemory(Number(resourceLimits.allowed.limits.memory))}{" "}
            </span>
            ,
            <span className="font-semibold">
              {" "}
              Storage{" "}
              {formatStorage(
                Number(resourceLimits.allowed.limits.storage)
              )}{" "}
            </span>
          </div>
          {/* Used Limits */}
          <div>
            Used:
            <span className="font-semibold">
              {" "}
              CPU {formatCpu(Number(resourceLimits.usage.limits.cpu))}{" "}
            </span>
            ,
            <span className="font-semibold">
              {" "}
              Memory {formatMemory(
                Number(resourceLimits.usage.limits.memory)
              )}{" "}
            </span>
            ,
            <span className="font-semibold">
              {" "}
              Storage{" "}
              {formatStorage(Number(resourceLimits.usage.limits.storage))}{" "}
            </span>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center gap-1">
            <Input
              value={cpuRequestsValue}
              onChange={(e) => {
                const sanitized = sanitizeNumber(e.target.value);
                setCpuRequestsValue(sanitized);
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
              helperText={formatCpu(
                parseInt(
                  cpuRequestsValue ? cpuRequestsValue + cpuRequestsUnit : "0"
                )
              )}
              unitSelect={{
                value: cpuRequestsUnit,
                options: cpuUnitOptions,
                onChange: (unit) => {
                  setCpuRequestsUnit(unit);
                  handleResourceChange(
                    "requests",
                    "cpu",
                    cpuRequestsValue ? cpuRequestsValue + unit : ""
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
              value={memoryRequestsValue}
              onChange={(e) => {
                const sanitized = sanitizeNumber(e.target.value);
                setMemoryRequestsValue(sanitized);
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
              helperText={formatMemory(
                parseMemory(
                  memoryRequestsValue
                    ? memoryRequestsValue + memoryRequestsUnit
                    : "0"
                )
              )}
              unitSelect={{
                value: memoryRequestsUnit,
                options: memoryUnitOptions,
                onChange: (unit) => {
                  setMemoryRequestsUnit(unit);
                  handleResourceChange(
                    "requests",
                    "memory",
                    memoryRequestsValue ? memoryRequestsValue + unit : ""
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
              value={storageRequestsValue}
              onChange={(e) => {
                const sanitized = sanitizeNumber(e.target.value);
                setStorageRequestsValue(sanitized);
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
              helperText={formatStorage(
                parseStorage(
                  storageRequestsValue
                    ? storageRequestsValue + storageRequestsUnit
                    : "0"
                )
              )}
              unitSelect={{
                value: storageRequestsUnit,
                options: storageUnitOptions,
                onChange: (unit) => {
                  setStorageRequestsUnit(unit);
                  handleResourceChange(
                    "requests",
                    "storage",
                    storageRequestsValue ? storageRequestsValue + unit : ""
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
              value={cpuLimitsValue}
              onChange={(e) => {
                const sanitized = sanitizeNumber(e.target.value);
                setCpuLimitsValue(sanitized);
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
              helperText={formatCpu(
                parseInt(cpuLimitsValue ? cpuLimitsValue + cpuLimitsUnit : "0")
              )}
              unitSelect={{
                value: cpuLimitsUnit,
                options: cpuUnitOptions,
                onChange: (unit) => {
                  setCpuLimitsUnit(unit);
                  handleResourceChange(
                    "limits",
                    "cpu",
                    cpuLimitsValue ? cpuLimitsValue + unit : ""
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
              value={memoryLimitsValue}
              onChange={(e) => {
                const sanitized = sanitizeNumber(e.target.value);
                setMemoryLimitsValue(sanitized);
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
              helperText={formatMemory(
                parseMemory(
                  memoryLimitsValue ? memoryLimitsValue + memoryLimitsUnit : "0"
                )
              )}
              unitSelect={{
                value: memoryLimitsUnit,
                options: memoryUnitOptions,
                onChange: (unit) => {
                  setMemoryLimitsUnit(unit);
                  handleResourceChange(
                    "limits",
                    "memory",
                    memoryLimitsValue ? memoryLimitsValue + unit : ""
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
              value={storageLimitsValue}
              onChange={(e) => {
                const sanitized = sanitizeNumber(e.target.value);
                setStorageLimitsValue(sanitized);
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
              helperText={formatStorage(
                parseStorage(
                  storageLimitsValue
                    ? storageLimitsValue + storageLimitsUnit
                    : "0"
                )
              )}
              unitSelect={{
                value: storageLimitsUnit,
                options: storageUnitOptions,
                onChange: (unit) => {
                  setStorageLimitsUnit(unit);
                  handleResourceChange(
                    "limits",
                    "storage",
                    storageLimitsValue ? storageLimitsValue + unit : ""
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
