import React from "react";
import Input from "../../../ui/Input/Input";
import { HiCheck, HiX } from "react-icons/hi";
import AnimatedButton from "../../../ui/AnimatedButton/AnimatedButton";
import {
  formatCpu,
  formatMemory,
  formatStorage,
} from "../../../../utils/resources";
import type ExtraResourcesEditorProps from "../../../../types/ExtraResources/ExtraResourcesEditorProps";

const ExtraResourcesEditor: React.FC<ExtraResourcesEditorProps> = ({
  data,
  onChange,
  onSave,
  onCancel,
  saving,
}) => {
  return (
    <div className="space-y-1">
      <div className="flex gap-2 mb-1">
        <div className="flex flex-col w-20">
          <Input
            className="w-20 text-xs"
            placeholder="Req CPU"
            value={data.requestsCpu}
            onChange={(e) => onChange("requestsCpu", e.target.value)}
            type="number"
          />
          <span className="text-[10px] text-zinc-400 pl-1">
            {formatCpu(Number(data.requestsCpu))}
          </span>
        </div>
        <div className="flex flex-col w-24">
          <Input
            className="w-24 text-xs"
            placeholder="Req Mem"
            value={data.requestsMemory}
            onChange={(e) => onChange("requestsMemory", e.target.value)}
            type="number"
          />
          <span className="text-[10px] text-zinc-400 pl-1">
            {formatMemory(Number(data.requestsMemory))}
          </span>
        </div>
        <div className="flex flex-col w-24">
          <Input
            className="w-24 text-xs"
            placeholder="Req Storage"
            value={data.requestsStorage}
            onChange={(e) => onChange("requestsStorage", e.target.value)}
            type="number"
          />
          <span className="text-[10px] text-zinc-400 pl-1">
            {formatStorage(Number(data.requestsStorage))}
          </span>
        </div>
      </div>
      <div className="flex gap-2 mb-1">
        <div className="flex flex-col w-20">
          <Input
            className="w-20 text-xs"
            placeholder="Lim CPU"
            value={data.limitsCpu}
            onChange={(e) => onChange("limitsCpu", e.target.value)}
            type="number"
          />
          <span className="text-[10px] text-zinc-400 pl-1">
            {formatCpu(Number(data.limitsCpu))}
          </span>
        </div>
        <div className="flex flex-col w-24">
          <Input
            className="w-24 text-xs"
            placeholder="Lim Mem"
            value={data.limitsMemory}
            onChange={(e) => onChange("limitsMemory", e.target.value)}
            type="number"
          />
          <span className="text-[10px] text-zinc-400 pl-1">
            {formatMemory(Number(data.limitsMemory))}
          </span>
        </div>
        <div className="flex flex-col w-24">
          <Input
            className="w-24 text-xs"
            placeholder="Lim Storage"
            value={data.limitsStorage}
            onChange={(e) => onChange("limitsStorage", e.target.value)}
            type="number"
          />
          <span className="text-[10px] text-zinc-400 pl-1">
            {formatStorage(Number(data.limitsStorage))}
          </span>
        </div>
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
