import React from 'react';
import { Card } from '@/components/ui';
import type Port from '@/types/Application/Port/Port';
import type Resource from '@/types/Application/Resource/Resource';
import EnvVarsSection from './EnvVarsSection/EnvVarsSection';
import PortsSection from './PortsSection/PortsSection';
import ResourcesSection from './ResourcesSection/ResourcesSection';

interface SetupTabProps {
  envList: [string, string][];
  handleEnvChange: (idx: number, key: string, value: string) => void;
  addEnvVar: () => void;
  removeEnvVar: (idx: number) => void;
  ports: Port[];
  onPortsChange: (ports: Port[]) => void;
  resourceLimits: {
    allowed: {
      requests: { cpu: number; memory: number; storage: number };
      limits: { cpu: number; memory: number; storage: number };
    };
    usage: {
      requests: { cpu: number; memory: number; storage: number };
      limits: { cpu: number; memory: number; storage: number };
    };
  } | null;
  resources: {
    requests?: Resource;
    limits?: Resource;
  };
  handleResourceChange: (
    section: 'requests' | 'limits',
    field: 'cpu' | 'memory' | 'storage',
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
    <Card form>
      <EnvVarsSection
        envList={envList}
        handleEnvChange={handleEnvChange}
        addEnvVar={addEnvVar}
        removeEnvVar={removeEnvVar}
      />
    </Card>
    <Card form>
      <PortsSection ports={ports} onChange={onPortsChange} />
    </Card>
    <Card form>
      <ResourcesSection
        resourceLimits={resourceLimits}
        resources={resources}
        handleResourceChange={handleResourceChange}
      />
    </Card>
  </div>
);

export default SetupTab;
