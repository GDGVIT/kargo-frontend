import React from "react";
import Input from "../../../ui/Input/Input";
import type ResourcesSectionProps from "../../../../types/Application/Resources/ResourcesSectionProps/ResourcesSectionProps";

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
              CPU {resourceLimits.allowed.requests.cpuMilli}{" "}
            </span>
            ,
            <span className="font-semibold">
              {" "}
              Memory {resourceLimits.allowed.requests.memoryMB}{" "}
            </span>
            ,
            <span className="font-semibold">
              {" "}
              Storage {resourceLimits.allowed.requests.storageGB}{" "}
            </span>
          </div>
          <div>
            Used:
            <span className="font-semibold">
              {" "}
              CPU {resourceLimits.usage.requests.cpuMilli}{" "}
            </span>
            ,
            <span className="font-semibold">
              {" "}
              Memory {resourceLimits.usage.requests.memoryMB}{" "}
            </span>
            ,
            <span className="font-semibold">
              {" "}
              Storage {resourceLimits.usage.requests.storageGB}{" "}
            </span>
          </div>
          <div>
            Allowed Limits:
            <span className="font-semibold">
              {" "}
              CPU {resourceLimits.allowed.limits.cpuMilli}{" "}
            </span>
            ,
            <span className="font-semibold">
              {" "}
              Memory {resourceLimits.allowed.limits.memoryMB}{" "}
            </span>
            ,
            <span className="font-semibold">
              {" "}
              Storage {resourceLimits.allowed.limits.storageGB}{" "}
            </span>
          </div>
          <div>
            Used:
            <span className="font-semibold">
              {" "}
              CPU {resourceLimits.usage.limits.cpuMilli}{" "}
            </span>
            ,
            <span className="font-semibold">
              {" "}
              Memory {resourceLimits.usage.limits.memoryMB}{" "}
            </span>
            ,
            <span className="font-semibold">
              {" "}
              Storage {resourceLimits.usage.limits.storageGB}{" "}
            </span>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center gap-1">
            <Input
              value={resources?.requests?.cpuMilli || ""}
              onChange={(e) => {
                handleResourceChange("requests", "cpuMilli", e.target.value);
              }}
              placeholder="100"
              inputMode="numeric"
              pattern="[0-9]*"
              label="CPU Requests"
              className="!mb-0"
            />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1">
            <Input
              value={resources?.requests?.memoryMB || ""}
              onChange={(e) => {
                handleResourceChange("requests", "memoryMB", e.target.value);
              }}
              placeholder="256"
              inputMode="numeric"
              pattern="[0-9]*"
              label="Memory Requests"
              className="!mb-0"
            />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1">
            <Input
              value={resources?.requests?.storageGB || ""}
              onChange={(e) => {
                handleResourceChange("requests", "storageGB", e.target.value);
              }}
              placeholder="10"
              inputMode="numeric"
              pattern="[0-9]*"
              label="Storage Requests"
              className="!mb-0"
            />
          </div>
        </div>
        {/* Limits Section */}
        <div>
          <div className="flex items-center gap-1">
            <Input
              value={resources?.limits?.cpuMilli || ""}
              onChange={(e) => {
                handleResourceChange("limits", "cpuMilli", e.target.value);
              }}
              placeholder="200"
              inputMode="numeric"
              pattern="[0-9]*"
              label="CPU Limits"
              className="!mb-0"
            />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1">
            <Input
              value={resources?.limits?.memoryMB || ""}
              onChange={(e) => {
                handleResourceChange("limits", "memoryMB", e.target.value);
              }}
              placeholder="512"
              inputMode="numeric"
              pattern="[0-9]*"
              label="Memory Limits"
              className="!mb-0"
            />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1">
            <Input
              value={resources?.limits?.storageGB || ""}
              onChange={(e) => {
                handleResourceChange("limits", "storageGB", e.target.value);
              }}
              placeholder="20"
              inputMode="numeric"
              pattern="[0-9]*"
              label="Storage Limits"
              className="!mb-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcesSection;
