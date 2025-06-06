import React from "react";

interface Port {
  containerPort: number;
  name?: string;
  protocol?: string;
  ingressEnabled?: boolean;
}

interface User {
  username?: string;
}

interface PortsSectionProps {
  ports: Port[];
  subdomains: string[];
  user: User;
  getBaseDomain: () => string;
  handlePortChange: (
    idx: number,
    field: string,
    value: string | boolean
  ) => void;
  handleSubdomainChange: (idx: number, value: string) => void;
  addPort: () => void;
  removePort: (idx: number) => void;
}

const PortsSection: React.FC<PortsSectionProps> = ({
  ports,
  subdomains,
  user,
  getBaseDomain,
  handlePortChange,
  handleSubdomainChange,
  addPort,
  removePort,
}) => (
  <div>
    <label className="mb-1 font-medium flex items-center justify-between">
      Ports
      <button
        type="button"
        className="ml-2 px-2 py-1 bg-blue-700 rounded text-xs hover:bg-blue-800"
        onClick={addPort}
      >
        + Add
      </button>
    </label>
    <div className="space-y-2">
      {ports.length === 0 && (
        <div className="text-gray-500 text-sm">No ports defined</div>
      )}
      {ports.map((port, idx) => (
        <div key={idx} className="flex gap-2 items-center">
          <input
            className="p-2 rounded  border border-gray-700 w-24 text-sm"
            type="number"
            min={1}
            max={65535}
            value={port.containerPort}
            onChange={(e) =>
              handlePortChange(idx, "containerPort", e.target.value)
            }
            placeholder="Port"
          />
          <input
            className="p-2 rounded  border border-gray-700 w-24 text-sm"
            value={port.name || ""}
            onChange={(e) => handlePortChange(idx, "name", e.target.value)}
            placeholder="Name"
          />
          <select
            className="p-2 rounded  border border-gray-700 w-28 text-sm"
            value={port.protocol || "TCP"}
            onChange={(e) => handlePortChange(idx, "protocol", e.target.value)}
            title="Protocol"
            aria-label="Protocol"
          >
            <option value="TCP">TCP</option>
            <option value="UDP">UDP</option>
          </select>
          {port.ingressEnabled && (
            <div className="flex gap-2 items-center mt-2">
              <input
                className="w-48 p-2 rounded border border-gray-700 bg-gray-900"
                value={subdomains[idx] || ""}
                onChange={(e) => handleSubdomainChange(idx, e.target.value)}
                placeholder="Subdomain (optional)"
              />
              <span className="text-gray-400 text-sm">
                Host:{" "}
                {subdomains[idx] && subdomains[idx].trim() !== ""
                  ? `${subdomains[idx]}.${
                      user?.username || "user"
                    }.${getBaseDomain()}`
                  : `${user?.username || "user"}.${getBaseDomain()}`}
              </span>
            </div>
          )}
          <label className="flex items-center ml-2 text-xs">
            <input
              type="checkbox"
              checked={!!port.ingressEnabled}
              onChange={(e) =>
                handlePortChange(idx, "ingressEnabled", e.target.checked)
              }
              className="mr-1"
            />
            Ingress
          </label>
          <button
            type="button"
            className="ml-2 px-2 py-1 bg-red-700 rounded text-xs hover:bg-red-800"
            onClick={() => removePort(idx)}
            title="Remove"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default PortsSection;
