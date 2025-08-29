import ResourceLimits from "../../Resource/ResourceLimits/ResourceLimits";
import Resources from "../Resources";

export default interface ResourcesSectionProps {
  resourceLimits: ResourceLimits;
  resources: Resources;
  handleResourceChange: (
    section: "requests" | "limits",
    field: "cpuMilli" | "memoryMB" | "storageGB",
    value: string
  ) => void;
}
