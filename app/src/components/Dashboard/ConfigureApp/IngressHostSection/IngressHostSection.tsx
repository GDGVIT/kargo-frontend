import React from "react";

interface IngressHostSectionProps {
  host: string;
}

const IngressHostSection: React.FC<IngressHostSectionProps> = ({ host }) => (
  <div>
    <label className="mb-1 font-medium">Ingress Host (Domain)</label>
    <input
      className="w-full p-3 rounded-lg border border-gray-700 bg-gray-800 text-gray-400 cursor-not-allowed"
      value={host}
      readOnly
      disabled
      tabIndex={-1}
      aria-readonly="true"
      aria-label="Ingress Host (computed by backend)"
      placeholder="Computed by backend"
    />
  </div>
);

export default IngressHostSection;
