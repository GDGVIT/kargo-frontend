import React from "react";
import Input from "../../../ui/Input/Input";
import type ExtraResourcesEditorProps from "../../../../types/ExtraResources/ExtraResourcesEditorProps";

const ExtraResourcesEditor: React.FC<ExtraResourcesEditorProps> = ({
  data,
  onChange,
  onSave,
  onCancel,
  saving,
}) => (
  <div className="space-y-1">
    <div className="flex gap-2 mb-1">
      <Input
        className="w-20 text-xs"
        placeholder="Req CPU"
        value={data.requestsCpu}
        onChange={(e) => onChange("requestsCpu", e.target.value)}
      />
      <Input
        className="w-24 text-xs"
        placeholder="Req Mem"
        value={data.requestsMemory}
        onChange={(e) => onChange("requestsMemory", e.target.value)}
      />
    </div>
    <div className="flex gap-2 mb-1">
      <Input
        className="w-20 text-xs"
        placeholder="Lim CPU"
        value={data.limitsCpu}
        onChange={(e) => onChange("limitsCpu", e.target.value)}
      />
      <Input
        className="w-24 text-xs"
        placeholder="Lim Mem"
        value={data.limitsMemory}
        onChange={(e) => onChange("limitsMemory", e.target.value)}
      />
    </div>
    <div className="flex gap-2">
      <button
        className="px-2 py-1 bg-sky-600 text-xs rounded hover:bg-sky-700"
        disabled={saving}
        onClick={onSave}
      >
        Save
      </button>
      <button
        className="px-2 py-1 bg-zinc-700 text-xs rounded hover:bg-zinc-800"
        onClick={onCancel}
      >
        Cancel
      </button>
    </div>
  </div>
);

export default ExtraResourcesEditor;
