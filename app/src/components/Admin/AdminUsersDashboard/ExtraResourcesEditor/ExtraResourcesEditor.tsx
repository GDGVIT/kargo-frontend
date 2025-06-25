import React, { useMemo, useState } from "react";
import Input from "../../../ui/Input/Input";
import { HiCheck, HiX } from "react-icons/hi";
import AnimatedButton from "../../../ui/AnimatedButton/AnimatedButton";
import type ExtraResourcesEditorProps from "../../../../types/ExtraResources/ExtraResourcesEditorProps";
import {
  formatMemory,
  formatCpu,
  formatStorage,
} from "../../../../utils/resources";

const cpuUnits = ["m", "vCPU"];
const memUnits = ["MB", "GB"];
const storageUnits = ["GB", "TB"];

const ExtraResourcesEditor: React.FC<ExtraResourcesEditorProps> = ({
  data,
  onChange,
  onSave,
  onCancel,
  saving,
}) => {
  // Unit selectors state
  const [reqCpuUnit, setReqCpuUnit] = useState("m");
  const [limCpuUnit, setLimCpuUnit] = useState("m");
  const [reqMemUnit, setReqMemUnit] = useState("MB");
  const [limMemUnit, setLimMemUnit] = useState("MB");
  const [reqStorageUnit, setReqStorageUnit] = useState("GB");
  const [limStorageUnit, setLimStorageUnit] = useState("GB");

  // Requests - formatted helper texts
  const reqCpuText = useMemo(() => {
    const val = data.requestsCpu === "" ? 0 : Number(data.requestsCpu);
    if (reqCpuUnit === "m") {
      return `${val} m (${formatCpu(val)})`;
    } else {
      return `${(val / 1000).toFixed(2)} vCPU (${val} m)`;
    }
  }, [data.requestsCpu, reqCpuUnit]);

  const reqMemText = useMemo(() => {
    const val = data.requestsMemory === "" ? 0 : Number(data.requestsMemory);
    if (reqMemUnit === "MB") {
      return `${val} MB (${formatMemory(val)})`;
    } else {
      return `${(val / 1000).toFixed(2)} GB (${formatMemory(val * 1000)})`;
    }
  }, [data.requestsMemory, reqMemUnit]);

  const reqStorageText = useMemo(() => {
    const val = data.requestsStorage === "" ? 0 : Number(data.requestsStorage);
    if (reqStorageUnit === "GB") {
      return `${val} GB (${formatStorage(val)})`;
    } else {
      return `${(val / 1000).toFixed(2)} TB (${formatStorage(val * 1000)})`;
    }
  }, [data.requestsStorage, reqStorageUnit]);

  // Limits - formatted helper texts
  const limCpuText = useMemo(() => {
    const val = data.limitsCpu === "" ? 0 : Number(data.limitsCpu);
    if (limCpuUnit === "m") {
      return `${val} m (${formatCpu(val)})`;
    } else {
      return `${(val / 1000).toFixed(2)} vCPU (${val} m)`;
    }
  }, [data.limitsCpu, limCpuUnit]);

  const limMemText = useMemo(() => {
    const val = data.limitsMemory === "" ? 0 : Number(data.limitsMemory);
    if (limMemUnit === "MB") {
      return `${val} MB (${formatMemory(val)})`;
    } else {
      return `${(val / 1000).toFixed(2)} GB (${formatMemory(val * 1000)})`;
    }
  }, [data.limitsMemory, limMemUnit]);

  const limStorageText = useMemo(() => {
    const val = data.limitsStorage === "" ? 0 : Number(data.limitsStorage);
    if (limStorageUnit === "GB") {
      return `${val} GB (${formatStorage(val)})`;
    } else {
      return `${(val / 1000).toFixed(2)} TB (${formatStorage(val * 1000)})`;
    }
  }, [data.limitsStorage, limStorageUnit]);

  // Handlers for CPU, Memory, Storage input to convert between units
  const handleCpuChange = (field: string, value: string, unit: string) => {
    let val = value;
    if (unit === "vCPU") {
      const v = parseFloat(value);
      if (!isNaN(v)) val = Math.round(v * 1000).toString();
    }
    onChange(field, val);
  };

  const handleMemChange = (field: string, value: string, unit: string) => {
    let val = value;
    if (unit === "GB") {
      const v = parseFloat(value);
      if (!isNaN(v)) val = Math.round(v * 1000).toString();
    }
    onChange(field, val);
  };

  const handleStorageChange = (field: string, value: string, unit: string) => {
    let val = value;
    if (unit === "TB") {
      const v = parseFloat(value);
      if (!isNaN(v)) val = Math.round(v * 1000).toString();
    }
    onChange(field, val);
  };

  return (
    <div className="space-y-1">
      <div className="flex gap-2 mb-1">
        <Input
          className="w-20 text-xs"
          placeholder="Req CPU"
          value={
            reqCpuUnit === "m"
              ? data.requestsCpu
              : data.requestsCpu === ""
              ? ""
              : (Number(data.requestsCpu) / 1000).toString()
          }
          onChange={(e) =>
            handleCpuChange("requestsCpu", e.target.value, reqCpuUnit)
          }
          helperText={reqCpuText}
          type="number"
          unitSelect={{
            value: reqCpuUnit,
            options: cpuUnits,
            onChange: setReqCpuUnit,
          }}
        />
        <Input
          className="w-24 text-xs"
          placeholder="Req Mem"
          value={
            reqMemUnit === "MB"
              ? data.requestsMemory
              : data.requestsMemory === ""
              ? ""
              : (Number(data.requestsMemory) / 1000).toString()
          }
          onChange={(e) =>
            handleMemChange("requestsMemory", e.target.value, reqMemUnit)
          }
          helperText={reqMemText}
          type="number"
          unitSelect={{
            value: reqMemUnit,
            options: memUnits,
            onChange: setReqMemUnit,
          }}
        />
        <Input
          className="w-24 text-xs"
          placeholder="Req Storage"
          value={
            reqStorageUnit === "GB"
              ? data.requestsStorage
              : data.requestsStorage === ""
              ? ""
              : (Number(data.requestsStorage) / 1000).toString()
          }
          onChange={(e) =>
            handleStorageChange(
              "requestsStorage",
              e.target.value,
              reqStorageUnit
            )
          }
          helperText={reqStorageText}
          type="number"
          unitSelect={{
            value: reqStorageUnit,
            options: storageUnits,
            onChange: setReqStorageUnit,
          }}
        />
      </div>

      <div className="flex gap-2 mb-1">
        <Input
          className="w-20 text-xs"
          placeholder="Lim CPU"
          value={
            limCpuUnit === "m"
              ? data.limitsCpu
              : data.limitsCpu === ""
              ? ""
              : (Number(data.limitsCpu) / 1000).toString()
          }
          onChange={(e) =>
            handleCpuChange("limitsCpu", e.target.value, limCpuUnit)
          }
          helperText={limCpuText}
          type="number"
          unitSelect={{
            value: limCpuUnit,
            options: cpuUnits,
            onChange: setLimCpuUnit,
          }}
        />
        <Input
          className="w-24 text-xs"
          placeholder="Lim Mem"
          value={
            limMemUnit === "MB"
              ? data.limitsMemory
              : data.limitsMemory === ""
              ? ""
              : (Number(data.limitsMemory) / 1000).toString()
          }
          onChange={(e) =>
            handleMemChange("limitsMemory", e.target.value, limMemUnit)
          }
          helperText={limMemText}
          type="number"
          unitSelect={{
            value: limMemUnit,
            options: memUnits,
            onChange: setLimMemUnit,
          }}
        />
        <Input
          className="w-24 text-xs"
          placeholder="Lim Storage"
          value={
            limStorageUnit === "GB"
              ? data.limitsStorage
              : data.limitsStorage === ""
              ? ""
              : (Number(data.limitsStorage) / 1000).toString()
          }
          onChange={(e) =>
            handleStorageChange("limitsStorage", e.target.value, limStorageUnit)
          }
          helperText={limStorageText}
          type="number"
          unitSelect={{
            value: limStorageUnit,
            options: storageUnits,
            onChange: setLimStorageUnit,
          }}
        />
      </div>

      <div className="flex gap-2">
        <AnimatedButton
          className="px-2 py-1 text-xs"
          disabled={saving}
          onClick={onSave}
          variant="primary"
          icon={<HiCheck className="w-4 h-4" />}
        >
          Save
        </AnimatedButton>
        <AnimatedButton
          className="px-2 py-1 text-xs"
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
