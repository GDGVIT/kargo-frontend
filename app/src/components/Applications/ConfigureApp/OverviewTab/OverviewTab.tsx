import React from "react";
import ApplicationDetails from "./ApplicationDetails/ApplicationDetails";
import ApplicationUsage from "./ApplicationUsage/ApplicationUsage";
import type Application from "../../../../types/Application/Application";
import type Resources from "../../../../types/Application/Resources/Resources";

const OverviewTab: React.FC<{
  appId: string;
  form: Application | null;
  resources: Resources | undefined;
}> = ({ appId, form, resources }) => (
  <div className="space-y-8">
    <ApplicationDetails form={form} />
    <ApplicationUsage appId={appId} resources={resources} />
  </div>
);

export default OverviewTab;
