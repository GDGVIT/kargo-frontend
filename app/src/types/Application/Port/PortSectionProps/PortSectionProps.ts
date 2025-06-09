import Port from "../Port";

export default interface PortsSectionProps {
  ports: Port[];
  onChange: (ports: Port[]) => void;
}
