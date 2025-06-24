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
  ] = useResourceInput(resources?.requests?.cpuMilli, "m");
  // CPU Limits
  const [cpuLimitsValue, setCpuLimitsValue, cpuLimitsUnit, setCpuLimitsUnit] =
    useResourceInput(resources?.limits?.cpuMilli, "m");
  // Memory Requests
  const [
    memoryRequestsValue,
    setMemoryRequestsValue,
    memoryRequestsUnit,
    setMemoryRequestsUnit,
  ] = useResourceInput(resources?.requests?.memoryMB, "MB");
  // Memory Limits
  const [
    memoryLimitsValue,
    setMemoryLimitsValue,
    memoryLimitsUnit,
    setMemoryLimitsUnit,
  ] = useResourceInput(resources?.limits?.memoryMB, "MB");
  // Storage Requests
  const [
    storageRequestsValue,
    setStorageRequestsValue,
    storageRequestsUnit,
    setStorageRequestsUnit,
  ] = useResourceInput(resources?.requests?.storageGB, "GB");
  // Storage Limits
  const [
    storageLimitsValue,
    setStorageLimitsValue,
    storageLimitsUnit,
    setStorageLimitsUnit,
  ] = useResourceInput(resources?.limits?.storageGB, "GB");

  return (
    <div className="mb-6">
      {resourceLimits && (
        <div className="text-xs text-gray-400 mb-3 space-y-1">
          {/* Allowed Requests */}
          <div>
            Allowed Requests:
            <span className="font-semibold">
              {" "}
              CPU {formatCpu(
                Number(resourceLimits.allowed.requests.cpuMilli)
              )}{" "}
            </span>
            ,
            <span className="font-semibold">
              {" "}
              Memory{" "}
              {formatMemory(
                Number(resourceLimits.allowed.requests.memoryMB)
              )}{" "}
            </span>
            ,
            <span className="font-semibold">
              {" "}
              Storage{" "}
              {formatStorage(
                Number(resourceLimits.allowed.requests.storageGB)
              )}{" "}
            </span>
          </div>
          {/* Used Requests */}
          <div>
            Used:
            <span className="font-semibold">
              {" "}
              CPU {formatCpu(
                Number(resourceLimits.usage.requests.cpuMilli)
              )}{" "}
            </span>
            ,
            <span className="font-semibold">
              {" "}
              Memory{" "}
              {formatMemory(
                Number(resourceLimits.usage.requests.memoryMB)
              )}{" "}
            </span>
            ,
            <span className="font-semibold">
              {" "}
              Storage{" "}
              {formatStorage(
                Number(resourceLimits.usage.requests.storageGB)
              )}{" "}
            </span>
          </div>
          {/* Allowed Limits */}
          <div>
            Allowed Limits:
            <span className="font-semibold">
              {" "}
              CPU {formatCpu(
                Number(resourceLimits.allowed.limits.cpuMilli)
              )}{" "}
            </span>
            ,
            <span className="font-semibold">
              {" "}
              Memory{" "}
              {formatMemory(
                Number(resourceLimits.allowed.limits.memoryMB)
              )}{" "}
            </span>
            ,
            <span className="font-semibold">
              {" "}
              Storage{" "}
              {formatStorage(
                Number(resourceLimits.allowed.limits.storageGB)
              )}{" "}
            </span>
          </div>
          {/* Used Limits */}
          <div>
            Used:
            <span className="font-semibold">
              {" "}
              CPU {formatCpu(Number(resourceLimits.usage.limits.cpuMilli))}{" "}
            </span>
            ,
            <span className="font-semibold">
              {" "}
              Memory{" "}
              {formatMemory(Number(resourceLimits.usage.limits.memoryMB))}{" "}
            </span>
            ,
            <span className="font-semibold">
              {" "}
              Storage{" "}
              {formatStorage(
                Number(resourceLimits.usage.limits.storageGB)
              )}{" "}
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
                  "cpuMilli",
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
                    "cpuMilli",
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
                  "memoryMB",
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
                    "memoryMB",
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
                  "storageGB",
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
                    "storageGB",
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
                  "cpuMilli",
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
                    "cpuMilli",
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
                  "memoryMB",
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
                    "memoryMB",
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
                  "storageGB",
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
                    "storageGB",
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
