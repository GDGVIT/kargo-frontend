import React from "react";
import EnvVarsSection from "./EnvVarsSection/EnvVarsSection";
import PortsSection from "./PortsSection/PortsSection";
import ResourcesSection from "./ResourcesSection/ResourcesSection";
import type Port from "../../../../types/Application/Port/Port";
import type Resource from "../../../../types/Application/Resource/Resource";

interface SetupTabProps {
  envList: [string, string][];
  handleEnvChange: (idx: number, key: string, value: string) => void;
  addEnvVar: () => void;
  removeEnvVar: (idx: number) => void;
  ports: Port[];
  onPortsChange: (ports: Port[]) => void;
  resourceLimits: {
    allowed: {
      requests: { cpuMilli: number; memoryMB: number; storageGB: number };
      limits: { cpuMilli: number; memoryMB: number; storageGB: number };
    };
    usage: {
      requests: { cpuMilli: number; memoryMB: number; storageGB: number };
      limits: { cpuMilli: number; memoryMB: number; storageGB: number };
    };
  } | null;
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

const SetupTab: React.FC<SetupTabProps> = ({
  envList,
  handleEnvChange,
  addEnvVar,
  removeEnvVar,
  ports,
  onPortsChange,
  resourceLimits,
  resources,
  handleResourceChange,
}) => (
  <div className="space-y-8">
    <EnvVarsSection
      envList={envList}
      handleEnvChange={handleEnvChange}
      addEnvVar={addEnvVar}
      removeEnvVar={removeEnvVar}
    />
    <PortsSection ports={ports} onChange={onPortsChange} />
    <ResourcesSection
      resourceLimits={resourceLimits}
      resources={resources}
      handleResourceChange={handleResourceChange}
    />
  </div>
);

export default SetupTab;
