import React from "react";
import Input from "../../../ui/Input/Input";
import { HiCheck, HiX } from "react-icons/hi";
import AnimatedButton from "../../../ui/AnimatedButton/AnimatedButton";
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
        <Input
          className="w-20 text-xs"
          placeholder="Req CPU"
          value={data.requestsCpu}
          onChange={(e) => onChange("requestsCpu", e.target.value)}
          type="number"
        />
        <Input
          className="w-24 text-xs"
          placeholder="Req Mem"
          value={data.requestsMemory}
          onChange={(e) => onChange("requestsMemory", e.target.value)}
          type="number"
        />
        <Input
          className="w-24 text-xs"
          placeholder="Req Storage"
          value={data.requestsStorage}
          onChange={(e) => onChange("requestsStorage", e.target.value)}
          type="number"
        />
      </div>
      <div className="flex gap-2 mb-1">
        <Input
          className="w-20 text-xs"
          placeholder="Lim CPU"
          value={data.limitsCpu}
          onChange={(e) => onChange("limitsCpu", e.target.value)}
          type="number"
        />
        <Input
          className="w-24 text-xs"
          placeholder="Lim Mem"
          value={data.limitsMemory}
          onChange={(e) => onChange("limitsMemory", e.target.value)}
          type="number"
        />
        <Input
          className="w-24 text-xs"
          placeholder="Lim Storage"
          value={data.limitsStorage}
          onChange={(e) => onChange("limitsStorage", e.target.value)}
          type="number"
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
