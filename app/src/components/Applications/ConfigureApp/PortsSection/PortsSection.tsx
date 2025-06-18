import React, { useState } from "react";
import { useAuth } from "../../../Auth/AuthProvider/AuthProvider";
import type Port from "../../../../types/Application/Port/Port";
import type PortsSectionProps from "../../../../types/Application/Port/PortSectionProps/PortSectionProps";
import Input from "../../../ui/Input/Input";
import Select from "../../../ui/Select/Select";
import AnimatedButton from "../../../ui/AnimatedButton/AnimatedButton";
import { FaPlus } from "react-icons/fa";

const defaultPort: Port = {
  id: "",
  containerPort: 80,
  protocol: "TCP",
  subdomain: "",
};

const PortsSection: React.FC<PortsSectionProps> = ({ ports, onChange }) => {
  const { user } = useAuth();
  const username = user?.username || "user";
  const [localPorts, setLocalPorts] = useState<Port[]>(ports);
  const ingressBaseUrl =
    process.env.NEXT_PUBLIC_INGRESS_BASE_DOMAIN || "vitians.in";

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
      {localPorts.map(({ id, containerPort, protocol, subdomain }) => {
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
          <div key={id} className="flex flex-wrap gap-2 items-baseline">
            <div className="flex flex-col">
              <Input
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
                label="Container Port"
                helperText={
                  <button
                    type="button"
                    onClick={() => removePort(id)}
                    className="text-xs text-red-500 hover:underline focus:outline-none bg-transparent border-none p-0 m-0 cursor-pointer"
                    style={{
                      fontSize: "0.75rem",
                      background: "none",
                      border: "none",
                    }}
                  >
                    Remove
                  </button>
                }
              />
            </div>

            <div className="flex flex-col">
              <Select
                value={protocol}
                onChange={(value) => updatePort(id, "protocol", value)}
                label="Protocol"
                options={[
                  { value: "TCP", label: "TCP" },
                  { value: "UDP", label: "UDP" },
                ]}
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center">
                <Input
                  value={subdomainSegment}
                  onChange={(e) => {
                    const newSub = e.target.value
                      ? `${e.target.value}.${username}.${ingressBaseUrl}`
                      : "";
                    updatePort(id, "subdomain", newSub);
                  }}
                  required
                  placeholder="Subdomain "
                  label="Subdomain"
                  helperText={
                    subdomainSegment ? (
                      <>
                        Visit{" "}
                        <a
                          href={`https://${subdomainSegment}.${username}.${ingressBaseUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >{`${subdomainSegment}.${username}.${ingressBaseUrl}`}</a>
                      </>
                    ) : undefined
                  }
                />
              </div>
            </div>
          </div>
        );
      })}
      <AnimatedButton
        type="button"
        onClick={addPort}
        icon={<FaPlus />}
        variant="primary"
      >
        Add Port
      </AnimatedButton>
    </div>
  );
};

export default PortsSection;
