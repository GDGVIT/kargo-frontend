import React, { useState } from "react";

interface Port {
  id: string;
  containerPort: number;
  hostPort: number;
  protocol: "TCP" | "UDP";
  description?: string;
  subdomain?: string;
}

interface PortsSectionProps {
  ports: Port[];
  onChange: (ports: Port[]) => void;
}

const defaultPort: Port = {
  id: "",
  containerPort: 80,
  hostPort: 80,
  protocol: "TCP",
  description: "",
  subdomain: "",
};

const PortsSection: React.FC<PortsSectionProps> = ({ ports, onChange }) => {
  const [localPorts, setLocalPorts] = useState<Port[]>(ports);

  const updatePort = (id: string, key: keyof Port, value: string | number) => {
    const updatedPorts = localPorts.map((port) =>
      port.id === id ? { ...port, [key]: value } : port
    );
    setLocalPorts(updatedPorts);
    onChange(updatedPorts);
  };

  const addPort = () => {
    const newPort: Port = {
      ...defaultPort,
      id: Math.random().toString(36).substring(2, 9),
    };
    const updatedPorts = [...localPorts, newPort];
    setLocalPorts(updatedPorts);
    onChange(updatedPorts);
  };

  const removePort = (id: string) => {
    const updatedPorts = localPorts.filter((port) => port.id !== id);
    setLocalPorts(updatedPorts);
    onChange(updatedPorts);
  };

  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-gray-700 mb-2">
        Ports Configuration
      </h3>
      {localPorts.map(
        ({ id, containerPort, hostPort, protocol, description, subdomain }) => (
          <div
            key={id}
            className="flex flex-wrap gap-2 items-end mb-3 border-b border-gray-100 pb-3"
          >
            <div className="flex flex-col">
              <label
                htmlFor={`containerPort-${id}`}
                className="text-xs text-gray-600 mb-1"
              >
                Container Port:
              </label>
              <input
                id={`containerPort-${id}`}
                type="number"
                min={1}
                max={65535}
                value={containerPort}
                placeholder="Container Port"
                onChange={(e) =>
                  updatePort(id, "containerPort", parseInt(e.target.value, 10))
                }
                required
                title="Container port number (1-65535)"
                className="w-28 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 text-sm"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor={`hostPort-${id}`}
                className="text-xs text-gray-600 mb-1"
              >
                Host Port:
              </label>
              <input
                id={`hostPort-${id}`}
                type="number"
                min={1}
                max={65535}
                value={hostPort}
                placeholder="Host Port"
                onChange={(e) =>
                  updatePort(id, "hostPort", parseInt(e.target.value, 10))
                }
                required
                title="Host port number (1-65535)"
                className="w-28 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 text-sm"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor={`protocol-${id}`}
                className="text-xs text-gray-600 mb-1"
              >
                Protocol:
              </label>
              <select
                id={`protocol-${id}`}
                value={protocol}
                onChange={(e) =>
                  updatePort(id, "protocol", e.target.value as "TCP" | "UDP")
                }
                title="Select protocol type"
                className="w-24 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 text-sm"
              >
                <option value="TCP">TCP</option>
                <option value="UDP">UDP</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label
                htmlFor={`description-${id}`}
                className="text-xs text-gray-600 mb-1"
              >
                Description:
              </label>
              <input
                id={`description-${id}`}
                type="text"
                value={description || ""}
                placeholder="Description (optional)"
                onChange={(e) => updatePort(id, "description", e.target.value)}
                title="Optional description of this port"
                className="w-40 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 text-sm"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor={`subdomain-${id}`}
                className="text-xs text-gray-600 mb-1"
              >
                Subdomain:
              </label>
              <input
                id={`subdomain-${id}`}
                type="text"
                value={subdomain || ""}
                placeholder="Subdomain (optional)"
                onChange={(e) => updatePort(id, "subdomain", e.target.value)}
                title="Custom subdomain for this port"
                className="w-40 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 text-sm"
              />
            </div>
            <button
              type="button"
              onClick={() => removePort(id)}
              aria-label={`Remove port configuration ${containerPort}`}
              className="ml-2 px-2 py-1 text-red-500 hover:text-white hover:bg-red-500 rounded transition-colors text-xs"
            >
              Remove
            </button>
          </div>
        )
      )}
      <button
        type="button"
        onClick={addPort}
        className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
      >
        Add Port
      </button>
    </div>
  );
};

export default PortsSection;
