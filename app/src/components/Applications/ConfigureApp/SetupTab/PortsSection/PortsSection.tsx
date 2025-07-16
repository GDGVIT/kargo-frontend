import React, { useState, useEffect } from "react";
import { useAuth } from "../../../../Auth/AuthProvider/AuthProvider";
import type Port from "../../../../../types/Application/Port/Port";
import type PortsSectionProps from "../../../../../types/Application/Port/PortSectionProps/PortSectionProps";
import Input from "../../../../ui/Input/Input";
import Select from "../../../../ui/Select/Select";
import AnimatedButton from "../../../../ui/AnimatedButton/AnimatedButton";
import { FaPlus } from "react-icons/fa";

const defaultPort: Port = {
  containerPort: 80,
  protocol: "TCP",
  subdomain: "",
};

const PortsSection: React.FC<PortsSectionProps> = ({ ports, onChange }) => {
  const { user } = useAuth();
  const username = user?.username || "user";
  const [localPorts, setLocalPorts] = useState<(Port & { id?: string })[]>(
    ports.map((p) => ({
      ...p,
      id: p.name || Math.random().toString(36).substring(2, 9),
    }))
  );
  const ingressBaseUrl =
    process.env.NEXT_PUBLIC_INGRESS_BASE_DOMAIN || "vitians.in";

  useEffect(() => {
    // Sync localPorts if parent changes
    setLocalPorts(
      ports.map((p) => ({
        ...p,
        id: p.name || Math.random().toString(36).substring(2, 9),
      }))
    );
  }, [ports]);

  const updatePort = (
    id: string | undefined,
    key: keyof Port,
    value: string | number
  ) => {
    const updatedPorts = localPorts.map((port) =>
      port.id === id ? { ...port, [key]: value } : port
    );
    setLocalPorts(updatedPorts);
    // Strip id and add name as port{idx} if not present
    onChange(
      updatedPorts.map((p, idx) => ({
        name: p.name || `port${idx}`,
        containerPort: Number(p.containerPort),
        protocol: p.protocol || "TCP",
        subdomain: p.subdomain || "",
      }))
    );
  };

  const addPort = () => {
    const newPort: Port & { id: string } = {
      ...defaultPort,
      id: Math.random().toString(36).substring(2, 9),
    };
    const updatedPorts = [...localPorts, newPort];
    setLocalPorts(updatedPorts);
    onChange(
      updatedPorts.map((p, idx) => ({
        name: p.name || `port${idx}`,
        containerPort: Number(p.containerPort),
        protocol: p.protocol || "TCP",
        subdomain: p.subdomain || "",
      }))
    );
  };

  const removePort = (id: string | undefined) => {
    const updatedPorts = localPorts.filter((port) => port.id !== id);
    setLocalPorts(updatedPorts);
    onChange(
      updatedPorts.map((p, idx) => ({
        name: p.name || `port${idx}`,
        containerPort: Number(p.containerPort),
        protocol: p.protocol || "TCP",
        subdomain: p.subdomain || "",
      }))
    );
  };

  return (
    <div className="mb-6">
      {localPorts.map(({ id, containerPort, protocol, subdomain }, idx) => {
        let subdomainSegment = "";
        if (subdomain) {
          const regex = new RegExp(
            `^([^.]+)\\.${username}\\.${ingressBaseUrl.replace(".", "\\.")}$`
          );
          const match = subdomain.match(regex);
          if (match) {
            subdomainSegment = match[1];
          } else if (!subdomain.includes(`.${username}.${ingressBaseUrl}`)) {
            subdomainSegment = subdomain;
          }
        }
        return (
          <div key={id || idx} className="flex gap-2 items-center mb-2">
            <Input
              label="Container Port"
              type="number"
              min={1}
              max={65535}
              value={containerPort.toString()}
              onChange={(v) => updatePort(id, "containerPort", v)}
              className="w-32"
              helperText="Port number (1-65535)"
            />
            <Select
              label="Protocol"
              value={protocol || "TCP"}
              options={[
                { label: "TCP", value: "TCP" },
                { label: "UDP", value: "UDP" },
              ]}
              onChange={(v) => updatePort(id, "protocol", v)}
              className="w-28"
              helperText="Network protocol"
            />
            <Input
              label="Subdomain"
              value={subdomainSegment}
              onChange={(v) => updatePort(id, "subdomain", v)}
              placeholder="(optional)"
              className="w-48"
              helperText={
                <a
                  href={`https://${
                    subdomainSegment || "app"
                  }.${username}.${ingressBaseUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >{`${
                  subdomainSegment || "app"
                }.${username}.${ingressBaseUrl}`}</a>
              }
            />
            <AnimatedButton
              onClick={() => removePort(id)}
              className="!bg-red-700 !text-white"
              icon={null}
              title="Remove"
              variant="danger"
            >
              Remove
            </AnimatedButton>
          </div>
        );
      })}
      <AnimatedButton
        onClick={addPort}
        className="!bg-blue-700 !text-white"
        icon={<FaPlus />}
        title="Add Port"
        variant="primary"
      >
        Add Port
      </AnimatedButton>
    </div>
  );
};

export default PortsSection;
