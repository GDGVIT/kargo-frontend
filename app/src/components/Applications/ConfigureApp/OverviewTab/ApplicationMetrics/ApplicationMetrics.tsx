import React from "react";
import MetricsSection from "./MetricsSection/MetricsSection";
import type Resources from "../../../../../types/Application/Resources/Resources";

const ApplicationMetrics: React.FC<{
  appId: string;
  resources: Resources | undefined;
}> = ({ appId, resources }) => (
  <div className="mt-8">
    <h3 className="text-lg font-bold mb-2 text-gray-100">Metrics</h3>
    <div className="space-y-6">
      <MetricsSection appId={appId} metricType="cpu" resources={resources} />
      <MetricsSection appId={appId} metricType="memory" resources={resources} />
      <MetricsSection
        appId={appId}
        metricType="storage"
        resources={resources}
      />
    </div>
  </div>
);

export default ApplicationMetrics;
