import React from 'react';
import Input from '../../../../ui/Input/Input';
import { formatCpu, formatMemory, formatStorage } from '../../../../../utils/resources';
import type Resource from '../../../../../types/Application/Resource/Resource';

export interface ResourceLimits {
  allowed: {
    requests: { cpu: number; memory: number; storage: number };
    limits: { cpu: number; memory: number; storage: number };
  };
  usage: {
    requests: { cpu: number; memory: number; storage: number };
    limits: { cpu: number; memory: number; storage: number };
  };
}

interface ResourcesSectionProps {
  resourceLimits: ResourceLimits | null;
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

const ResourcesSection: React.FC<ResourcesSectionProps> = ({
  resourceLimits,
  resources,
  handleResourceChange,
}) => {
  // Log allowed resources to the console when resourceLimits is present
  React.useEffect(() => {
    if (resourceLimits && resourceLimits.allowed) {
      // Only log once per change
      console.log('Allowed resources:', resourceLimits.allowed);
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
              <div className="font-medium text-gray-600 dark:text-gray-400 mb-2">Requests</div>
              <div className="space-y-1 text-gray-500 dark:text-gray-500">
                <div>
                  Allowed: {formatCpu(resourceLimits.allowed.requests.cpu)},{' '}
                  {formatMemory(resourceLimits.allowed.requests.memory)},{' '}
                  {formatStorage(resourceLimits.allowed.requests.storage)}
                </div>
                <div>
                  Used: {formatCpu(resourceLimits.usage.requests.cpu)},{' '}
                  {formatMemory(resourceLimits.usage.requests.memory)},{' '}
                  {formatStorage(resourceLimits.usage.requests.storage)}
                </div>
              </div>
            </div>
            <div>
              <div className="font-medium text-gray-600 dark:text-gray-400 mb-2">Limits</div>
              <div className="space-y-1 text-gray-500 dark:text-gray-500">
                <div>
                  Allowed: {formatCpu(resourceLimits.allowed.limits.cpu)},{' '}
                  {formatMemory(resourceLimits.allowed.limits.memory)},{' '}
                  {formatStorage(resourceLimits.allowed.limits.storage)}
                </div>
                <div>
                  Used: {formatCpu(resourceLimits.usage.limits.cpu)},{' '}
                  {formatMemory(resourceLimits.usage.limits.memory)},{' '}
                  {formatStorage(resourceLimits.usage.limits.storage)}
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
                resources?.requests?.cpu !== undefined && resources?.requests?.cpu !== null
                  ? resources.requests.cpu.toString()
                  : ''
              }
              onChange={(val) => {
                handleResourceChange('requests', 'cpu', val);
              }}
              placeholder="0.1"
              inputMode="numeric"
              step="0.001"
              label="CPU"
              className="!mb-0"
              type="number"
              unitType="cpu"
              displayHelperText
            />
            <Input
              value={
                resources?.requests?.memory !== undefined && resources?.requests?.memory !== null
                  ? resources.requests.memory.toString()
                  : ''
              }
              onChange={(val) => {
                handleResourceChange('requests', 'memory', val);
              }}
              placeholder="268435456"
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
                resources?.requests?.storage !== undefined && resources?.requests?.storage !== null
                  ? resources.requests.storage.toString()
                  : ''
              }
              onChange={(val) => {
                handleResourceChange('requests', 'storage', val);
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
                resources?.limits?.cpu !== undefined && resources?.limits?.cpu !== null
                  ? resources.limits.cpu.toString()
                  : ''
              }
              onChange={(val) => {
                handleResourceChange('limits', 'cpu', val);
              }}
              placeholder="0.2"
              inputMode="numeric"
              step="0.001"
              label="CPU"
              className="!mb-0"
              type="number"
              unitType="cpu"
              displayHelperText
            />
            <Input
              value={
                resources?.limits?.memory !== undefined && resources?.limits?.memory !== null
                  ? resources.limits.memory.toString()
                  : ''
              }
              onChange={(val) => {
                handleResourceChange('limits', 'memory', val);
              }}
              // 512MB in bytes
              placeholder={(512 * 1024 * 1024).toString()}
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
                resources?.limits?.storage !== undefined && resources?.limits?.storage !== null
                  ? resources.limits.storage.toString()
                  : ''
              }
              onChange={(val) => {
                handleResourceChange('limits', 'storage', val);
              }}
              placeholder="21474836480"
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
