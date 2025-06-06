import React, { useState } from "react";

interface Port {
  id: string;
  containerPort: number;
  hostPort: number;
  protocol: "TCP" | "UDP";
  description?: string;
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
    <div>
      <h3>Ports Configuration</h3>
      {localPorts.map(
        ({ id, containerPort, hostPort, protocol, description }) => (
          <div key={id}>
            <label htmlFor={`containerPort-${id}`}>Container Port:</label>
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
            />

            <label htmlFor={`hostPort-${id}`}>Host Port:</label>
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
            />

            <label htmlFor={`protocol-${id}`}>Protocol:</label>
            <select
              id={`protocol-${id}`}
              value={protocol}
              onChange={(e) =>
                updatePort(id, "protocol", e.target.value as "TCP" | "UDP")
              }
              title="Select protocol type"
            >
              <option value="TCP">TCP</option>
              <option value="UDP">UDP</option>
            </select>

            <label htmlFor={`description-${id}`}>Description:</label>
            <input
              id={`description-${id}`}
              type="text"
              value={description || ""}
              placeholder="Description (optional)"
              onChange={(e) => updatePort(id, "description", e.target.value)}
              title="Optional description of this port"
            />

            <button
              type="button"
              onClick={() => removePort(id)}
              aria-label={`Remove port configuration ${containerPort}`}
            >
              Remove
            </button>
          </div>
        )
      )}

      <button type="button" onClick={addPort}>
        Add Port
      </button>
    </div>
  );
};

export default PortsSection;
