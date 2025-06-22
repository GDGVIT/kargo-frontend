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
  const getNumeric = (val: string | number | undefined, suffix: string) => {
    if (val === undefined || val === null || val === "") return "0";
    const strVal = String(val);
    return strVal.endsWith(suffix) ? strVal.slice(0, -suffix.length) : strVal;
  };

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
              value={getNumeric(resources?.requests?.cpu, "m")}
              onChange={(e) => {
                const sanitized = sanitizeNumber(e.target.value);
                handleResourceChange(
                  "requests",
                  "cpu",
                  sanitized ? sanitized + "m" : ""
                );
              }}
              placeholder="100"
              inputMode="numeric"
              pattern="[0-9]*"
              label="CPU Requests"
              className="!mb-0"
              helperText={formatCpu(resources?.requests?.cpu)}
            />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1">
            <Input
              value={getNumeric(resources?.requests?.memory, "Mi")}
              onChange={(e) => {
                const sanitized = sanitizeNumber(e.target.value);
                handleResourceChange(
                  "requests",
                  "memory",
                  sanitized ? sanitized + "Mi" : ""
                );
              }}
              placeholder="256"
              inputMode="numeric"
              pattern="[0-9]*"
              label="Memory Requests (Mi)"
              className="!mb-0"
              helperText={formatMemory(resources?.requests?.memory)}
            />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1">
            <Input
              value={getNumeric(resources?.requests?.storage, "Gi")}
              onChange={(e) => {
                const sanitized = sanitizeNumber(e.target.value);
                handleResourceChange(
                  "requests",
                  "storage",
                  sanitized ? sanitized + "Gi" : ""
                );
              }}
              placeholder="10"
              inputMode="numeric"
              pattern="[0-9]*"
              label="Storage Requests (Gi)"
              className="!mb-0"
              helperText={formatStorage(resources?.requests?.storage)}
            />
          </div>
        </div>
        {/* Limits Section */}
        <div>
          <div className="flex items-center gap-1">
            <Input
              value={getNumeric(resources?.limits?.cpu, "m")}
              onChange={(e) => {
                const sanitized = sanitizeNumber(e.target.value);
                handleResourceChange(
                  "limits",
                  "cpu",
                  sanitized ? sanitized + "m" : ""
                );
              }}
              placeholder="200"
              inputMode="numeric"
              pattern="[0-9]*"
              label="CPU Limits"
              className="!mb-0"
              helperText={formatCpu(resources?.limits?.cpu)}
            />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1">
            <Input
              value={getNumeric(resources?.limits?.memory, "Mi")}
              onChange={(e) => {
                const sanitized = sanitizeNumber(e.target.value);
                handleResourceChange(
                  "limits",
                  "memory",
                  sanitized ? sanitized + "Mi" : ""
                );
              }}
              placeholder="512"
              inputMode="numeric"
              pattern="[0-9]*"
              label="Memory Limits (Mi)"
              className="!mb-0"
              helperText={formatMemory(resources?.limits?.memory)}
            />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1">
            <Input
              value={getNumeric(resources?.limits?.storage, "Gi")}
              onChange={(e) => {
                const sanitized = sanitizeNumber(e.target.value);
                handleResourceChange(
                  "limits",
                  "storage",
                  sanitized ? sanitized + "Gi" : ""
                );
              }}
              placeholder="20"
              inputMode="numeric"
              pattern="[0-9]*"
              label="Storage Limits (Gi)"
              className="!mb-0"
              helperText={formatStorage(resources?.limits?.storage)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcesSection;
