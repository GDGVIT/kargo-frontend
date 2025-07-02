import React, { useState } from "react";
import Input from "../../../ui/Input/Input";
import { HiCheck, HiX } from "react-icons/hi";
import AnimatedButton from "../../../ui/AnimatedButton/AnimatedButton";
import type ExtraResourcesEditorProps from "../../../../types/ExtraResources/ExtraResourcesEditorProps";

// Unit options
const cpuUnits = ["m", "vCPU"];
const memoryUnits = ["MB", "GB"];
const storageUnits = ["GB", "TB"];

const ExtraResourcesEditor: React.FC<ExtraResourcesEditorProps> = ({
  data,
  onChange,
  onSave,
  onCancel,
  saving,
}) => {
  // Local state for selected units
  const [cpuUnit, setCpuUnit] = useState("m");
  const [memoryUnit, setMemoryUnit] = useState("MB");
  const [storageUnit, setStorageUnit] = useState("GB");
  const [cpuLimitUnit, setCpuLimitUnit] = useState("m");
  const [memoryLimitUnit, setMemoryLimitUnit] = useState("MB");
  const [storageLimitUnit, setStorageLimitUnit] = useState("GB");

  // Helper to handle value change and convert to base unit
  const handleValueChange = (key: string, value: string, unit: string) => {
    let numericValue = Number(value);
    if (isNaN(numericValue)) numericValue = 0;
    let baseValue = numericValue;
    if (key.includes("Cpu")) {
      baseValue = unit === "vCPU" ? numericValue * 1000 : numericValue;
    } else if (key.includes("Memory")) {
      baseValue = unit === "GB" ? numericValue * 1024 : numericValue;
    } else if (key.includes("Storage")) {
      baseValue = unit === "TB" ? numericValue * 1024 : numericValue;
    }
    onChange(key, String(baseValue));
  };

  // Helper to get display value from base unit
  const getDisplayValue = (key: string, value: string, unit: string) => {
    const numericValue = Number(value);
    if (isNaN(numericValue)) return "";
    if (key.includes("Cpu")) {
      return unit === "vCPU"
        ? (numericValue / 1000).toString()
        : numericValue.toString();
    } else if (key.includes("Memory")) {
      return unit === "GB"
        ? (numericValue / 1024).toString()
        : numericValue.toString();
    } else if (key.includes("Storage")) {
      return unit === "TB"
        ? (numericValue / 1024).toString()
        : numericValue.toString();
    }
    return value;
  };

  // Helper to format value for helper text in selected unit
  const getHelperText = (key: string, value: string, unit: string) => {
    const numericValue = Number(value);
    if (isNaN(numericValue)) return "";
    if (key.includes("Cpu")) {
      return unit === "vCPU"
        ? `${(numericValue / 1000).toFixed(2)} vCPU`
        : `${numericValue} m`;
    } else if (key.includes("Memory")) {
      return unit === "GB"
        ? `${(numericValue / 1024).toFixed(2)} GB`
        : `${numericValue} MB`;
    } else if (key.includes("Storage")) {
      return unit === "TB"
        ? `${(numericValue / 1024).toFixed(2)} TB`
        : `${numericValue} GB`;
    }
    return value;
  };

  // Prepare data for API in base units on save
  const handleSave = () => {
    const toBase = (
      val: string,
      unit: string,
      type: "cpu" | "memory" | "storage"
    ) => {
      let num = Number(val);
      if (isNaN(num)) num = 0;
      if (type === "cpu") return unit === "vCPU" ? num * 1000 : num;
      if (type === "memory") return unit === "GB" ? num * 1024 : num;
      if (type === "storage") return unit === "TB" ? num * 1024 : num;
      return num;
    };
    onChange("requestsCpu", String(toBase(data.requestsCpu, cpuUnit, "cpu")));
    onChange(
      "requestsMemory",
      String(toBase(data.requestsMemory, memoryUnit, "memory"))
    );
    onChange(
      "requestsStorage",
      String(toBase(data.requestsStorage, storageUnit, "storage"))
    );
    onChange("limitsCpu", String(toBase(data.limitsCpu, cpuLimitUnit, "cpu")));
    onChange(
      "limitsMemory",
      String(toBase(data.limitsMemory, memoryLimitUnit, "memory"))
    );
    onChange(
      "limitsStorage",
      String(toBase(data.limitsStorage, storageLimitUnit, "storage"))
    );
    onSave();
  };

  return (
    <div className="space-y-4 w-full max-w-3xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-2">
        <div className="flex flex-col">
          <Input
            className="w-full text-xs"
            placeholder="Req CPU"
            value={getDisplayValue("requestsCpu", data.requestsCpu, cpuUnit)}
            onChange={(e) =>
              handleValueChange("requestsCpu", e.target.value, cpuUnit)
            }
            type="number"
            unitSelect={{
              value: cpuUnit,
              options: cpuUnits,
              onChange: setCpuUnit,
            }}
            helperText={getHelperText("requestsCpu", data.requestsCpu, cpuUnit)}
          />
        </div>
        <div className="flex flex-col">
          <Input
            className="w-full text-xs"
            placeholder="Req Mem"
            value={getDisplayValue(
              "requestsMemory",
              data.requestsMemory,
              memoryUnit
            )}
            onChange={(e) =>
              handleValueChange("requestsMemory", e.target.value, memoryUnit)
            }
            type="number"
            unitSelect={{
              value: memoryUnit,
              options: memoryUnits,
              onChange: setMemoryUnit,
            }}
            helperText={getHelperText(
              "requestsMemory",
              data.requestsMemory,
              memoryUnit
            )}
          />
        </div>
        <div className="flex flex-col">
          <Input
            className="w-full text-xs"
            placeholder="Req Storage"
            value={getDisplayValue(
              "requestsStorage",
              data.requestsStorage,
              storageUnit
            )}
            onChange={(e) =>
              handleValueChange("requestsStorage", e.target.value, storageUnit)
            }
            type="number"
            unitSelect={{
              value: storageUnit,
              options: storageUnits,
              onChange: setStorageUnit,
            }}
            helperText={getHelperText(
              "requestsStorage",
              data.requestsStorage,
              storageUnit
            )}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-2">
        <div className="flex flex-col">
          <Input
            className="w-full text-xs"
            placeholder="Lim CPU"
            value={getDisplayValue("limitsCpu", data.limitsCpu, cpuLimitUnit)}
            onChange={(e) =>
              handleValueChange("limitsCpu", e.target.value, cpuLimitUnit)
            }
            type="number"
            unitSelect={{
              value: cpuLimitUnit,
              options: cpuUnits,
              onChange: setCpuLimitUnit,
            }}
            helperText={getHelperText(
              "limitsCpu",
              data.limitsCpu,
              cpuLimitUnit
            )}
          />
        </div>
        <div className="flex flex-col">
          <Input
            className="w-full text-xs"
            placeholder="Lim Mem"
            value={getDisplayValue(
              "limitsMemory",
              data.limitsMemory,
              memoryLimitUnit
            )}
            onChange={(e) =>
              handleValueChange("limitsMemory", e.target.value, memoryLimitUnit)
            }
            type="number"
            unitSelect={{
              value: memoryLimitUnit,
              options: memoryUnits,
              onChange: setMemoryLimitUnit,
            }}
            helperText={getHelperText(
              "limitsMemory",
              data.limitsMemory,
              memoryLimitUnit
            )}
          />
        </div>
        <div className="flex flex-col">
          <Input
            className="w-full text-xs"
            placeholder="Lim Storage"
            value={getDisplayValue(
              "limitsStorage",
              data.limitsStorage,
              storageLimitUnit
            )}
            onChange={(e) =>
              handleValueChange(
                "limitsStorage",
                e.target.value,
                storageLimitUnit
              )
            }
            type="number"
            unitSelect={{
              value: storageLimitUnit,
              options: storageUnits,
              onChange: setStorageLimitUnit,
            }}
            helperText={getHelperText(
              "limitsStorage",
              data.limitsStorage,
              storageLimitUnit
            )}
          />
        </div>
      </div>
      <div className="flex gap-2 justify-end mt-4">
        <AnimatedButton
          className="px-2 py-1 text-xs"
          disabled={saving}
          onClick={handleSave}
          variant="primary"
          icon={<HiCheck className="w-4 h-4" />}
        >
          Save
        </AnimatedButton>
        <AnimatedButton
          className="px-2 py-1 text-xs"
          disabled={saving}
          onClick={onCancel}
          variant="secondary"
          icon={<HiX className="w-4 h-4" />}
        >
          Cancel
        </AnimatedButton>
      </div>
    </div>
  );
};

export default ExtraResourcesEditor;
