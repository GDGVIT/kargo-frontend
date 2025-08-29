import React from "react";
import type Application from "../../../../../types/Application/Application";
import Card from "../../../../ui/Card/Card";

const ApplicationDetails: React.FC<{ form: Application | null }> = ({
  form,
}) => {
  if (!form) return null;
  return (
    <>
      <h3 className="text-lg font-bold mb-2 text-gray-100">
        Application Details
      </h3>
      <Card className="bg-transparent">
        {/* Name and Image in one row */}
        <DetailItemRow>
          <DetailItem label="Name" value={form.name} />
          <DetailItem
            label="Image"
            value={`${form.imageUrl}:${form.imageTag}`}
          />
        </DetailItemRow>
        {/* Namespace in its own row if present */}
        {form.namespace && (
          <DetailItemRow>
            <DetailItem label="Namespace" value={form.namespace} />
          </DetailItemRow>
        )}
        {/* Deployment and Service in one row if either present */}
        {(form.deploymentName || form.serviceName) && (
          <DetailItemRow>
            {form.deploymentName && (
              <DetailItem label="Deployment Name" value={form.deploymentName} />
            )}
            {form.serviceName && (
              <DetailItem label="Service Name" value={form.serviceName} />
            )}
          </DetailItemRow>
        )}
        {/* Created and Updated in one row if either present */}
        {(form.createdAt || form.updatedAt) && (
          <DetailItemRow>
            {form.createdAt && (
              <DetailItem
                label="Created At"
                value={new Date(form.createdAt).toLocaleString()}
              />
            )}
            {form.updatedAt && (
              <DetailItem
                label="Updated At"
                value={new Date(form.updatedAt).toLocaleString()}
              />
            )}
          </DetailItemRow>
        )}
      </Card>
    </>
  );
};

export default ApplicationDetails;

const DetailItemRow: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div className="flex flex-wrap border-b border-[#353A48] px-4 py-2 last:border-b-0 sm:flex-row flex-col sm:gap-4 gap-2">
    {children}
  </div>
);

const DetailItem: React.FC<{
  label: string;
  value: string | number | boolean;
  className?: string;
}> = ({ label, value, className = "" }) => (
  <div
    className={`detail-item flex flex-col items-start gap-1 flex-1 min-w-[120px] ${className}`}
  >
    <span className="font-medium text-gray-300 text-sm mb-1">{label}</span>
    <span className="text-gray-100 text-base">{value.toString()}</span>
  </div>
);
