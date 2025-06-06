import React from "react";

interface Port {
  containerPort: number;
  name?: string;
  protocol?: string;
  ingressEnabled?: boolean;
  subdomain?: string; // <-- add subdomain field for each port
}

interface User {
  username?: string;
}

interface PortsSectionProps {
  ports: Port[];
  user: User;
  getBaseDomain: () => string;
  handlePortChange: (
    idx: number,
    field: string,
    value: string | boolean
  ) => void;
  addPort: () => void;
  removePort: (idx: number) => void;
}

const PortsSection: React.FC<PortsSectionProps> = ({
  ports,
  user,
  getBaseDomain,
  handlePortChange,
  addPort,
  removePort,
}) => (
  <div className="bg-gray-800 rounded-lg p-6 shadow-md border border-gray-700 w-full max-w-4xl mx-auto">
    <label className="mb-4 font-semibold text-lg flex items-center justify-between">
      <span className="flex items-center gap-2">
        <svg
          className="w-5 h-5 text-blue-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8v8m4-4H8"
          />
        </svg>
        Ports
      </span>
      <button
        type="button"
        className="ml-2 px-3 py-1 bg-blue-700 rounded hover:bg-blue-800 text-xs flex items-center gap-1 shadow transition"
        onClick={addPort}
        title="Add new port"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
        Add
      </button>
    </label>
    <div className="space-y-4 md:space-y-0 md:space-x-0 flex flex-col gap-4">
      {ports.length === 0 && (
        <div className="text-gray-400 text-sm italic">No ports defined</div>
      )}
      {ports.map((port, idx) => (
        <div
          key={idx}
          className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 bg-gray-900 rounded p-4 border border-gray-700 relative group transition-all duration-150 hover:border-blue-600"
        >
          <div className="flex flex-col gap-1 w-full md:w-24">
            <label className="text-xs text-gray-400" htmlFor={`port-${idx}`}>
              Port
            </label>
            <input
              id={`port-${idx}`}
              className="p-2 rounded border border-gray-700 bg-gray-950 text-sm focus:ring-2 focus:ring-blue-600 outline-none"
              type="number"
              min={1}
              max={65535}
              value={port.containerPort}
              onChange={(e) =>
                handlePortChange(idx, "containerPort", e.target.value)
              }
              placeholder="Port"
              title="Container port number"
            />
          </div>
          <div className="flex flex-col gap-1 w-full md:w-28">
            <label
              className="text-xs text-gray-400"
              htmlFor={`protocol-${idx}`}
            >
              Protocol
            </label>
            <select
              id={`protocol-${idx}`}
              className="p-2 rounded border border-gray-700 bg-gray-950 text-sm focus:ring-2 focus:ring-blue-600 outline-none"
              value={port.protocol || "TCP"}
              onChange={(e) =>
                handlePortChange(idx, "protocol", e.target.value)
              }
              title="Protocol"
              aria-label="Protocol"
            >
              <option value="TCP">TCP</option>
              <option value="UDP">UDP</option>
            </select>
          </div>
          <div className="flex flex-col gap-1 w-full md:w-48">
            <label
              className="text-xs text-gray-400"
              htmlFor={`subdomain-${idx}`}
            >
              Subdomain
            </label>
            <input
              id={`subdomain-${idx}`}
              className="p-2 rounded border border-gray-700 bg-gray-950 text-sm focus:ring-2 focus:ring-blue-600 outline-none transition-all duration-150 focus:border-blue-500"
              value={port.subdomain || ""}
              onChange={(e) =>
                handlePortChange(idx, "subdomain", e.target.value)
              }
              placeholder="Subdomain (optional)"
              title="Subdomain for ingress (optional)"
            />
            <label className="text-xs text-gray-400 mt-1">Host Preview</label>
            <span className="text-blue-300 bg-gray-950 px-2 py-1 rounded text-xs font-mono border border-gray-700 select-all break-all w-full block">
              {port.subdomain && port.subdomain.trim() !== ""
                ? `${port.subdomain}.${
                    user?.username || "user"
                  }.${getBaseDomain()}`
                : `${user?.username || "user"}.${getBaseDomain()}`}
            </span>
          </div>
          <button
            type="button"
            className="absolute top-2 right-2 md:static md:ml-2 px-2 py-1 bg-red-700 rounded hover:bg-red-800 text-xs flex items-center gap-1 shadow transition opacity-80 group-hover:opacity-100"
            onClick={() => removePort(idx)}
            title="Remove port"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Remove
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default PortsSection;
