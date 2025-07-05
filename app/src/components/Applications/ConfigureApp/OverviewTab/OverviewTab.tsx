import React from "react";
import ApplicationDetails from "./ApplicationDetails/ApplicationDetails";
import ApplicationMetrics from "./ApplicationMetrics/ApplicationMetrics";
import type Application from "../../../../types/Application/Application";
import type Resources from "../../../../types/Application/Resources/Resources";

const OverviewTab: React.FC<{
  appId: string;
  form: Application | null;
  resources: Resources | undefined;
}> = ({ appId, form, resources }) => (
  <div className="space-y-8">
    <ApplicationDetails form={form} />
    <ApplicationMetrics appId={appId} resources={resources} />
  </div>
);

export default OverviewTab;
