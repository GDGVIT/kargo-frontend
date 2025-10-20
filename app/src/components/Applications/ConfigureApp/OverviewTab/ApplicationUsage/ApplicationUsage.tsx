import React from 'react';
import UsageSection from './UsageSection/UsageSection';
import type Resources from '@/types/Application/Resources/Resources';

const ApplicationUsage: React.FC<{
  appId: string;
  resources: Resources | undefined;
}> = ({ appId, resources }) => (
  <div className="mt-8">
    <h3 className="text-lg font-bold mb-2 text-gray-100">Usage</h3>
    <div className="space-y-6">
      <UsageSection appId={appId} metricType="cpu" resources={resources} />
      <UsageSection appId={appId} metricType="memory" resources={resources} />
      <UsageSection appId={appId} metricType="storage" resources={resources} />
    </div>
  </div>
);

export default ApplicationUsage;
