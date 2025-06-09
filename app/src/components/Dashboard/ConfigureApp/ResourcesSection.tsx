import React from "react";
import { Input } from "../../ui/Input/Input";

import type ResourcesSectionProps from "../../../types/Application/Resources/ResourcesSectionProps/ResourcesSectionProps";

const sanitizeNumber = (val: string) => val.replace(/[^\d.]/g, "");

const ResourcesSection: React.FC<ResourcesSectionProps> = ({
  resourceLimits,
  resources,
  handleResourceChange,
}) => {
  const getNumeric = (val: string | undefined, suffix: string) => {
    if (!val) return "";
    return val.endsWith(suffix) ? val.slice(0, -suffix.length) : val;
  };

  return (
    <div className="mb-6">
      <h3 className="text-gray-400 mb-2">Resources</h3>
      {resourceLimits && (
        <div className="text-xs text-gray-400 mb-3 space-y-1">
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
          <div className="text-xs text-gray-400 mb-1">CPU Requests</div>
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
            />
            <span className="text-gray-400">m</span>
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-400 mb-1">Memory Requests</div>
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
              placeholder="128"
              inputMode="numeric"
              pattern="[0-9]*"
              label="Memory Requests"
              className="!mb-0"
            />
            <span className="text-gray-400">Mi</span>
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-400 mb-1">CPU Limits</div>
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
              placeholder="500"
              inputMode="numeric"
              pattern="[0-9]*"
              label="CPU Limits"
              className="!mb-0"
            />
            <span className="text-gray-400">m</span>
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-400 mb-1">Memory Limits</div>
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
              label="Memory Limits"
              className="!mb-0"
            />
            <span className="text-gray-400">Mi</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcesSection;
