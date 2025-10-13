import React from 'react';
import Input from '../../../ui/Input/Input';
import { HiCheck, HiX } from 'react-icons/hi';
import AnimatedButton from '../../../ui/AnimatedButton/AnimatedButton';
import type ExtraResourcesEditorProps from '../../../../types/ExtraResources/ExtraResourcesEditorProps';

const ExtraResourcesEditor: React.FC<ExtraResourcesEditorProps> = ({
  data,
  onChange,
  onSave,
  onCancel,
  saving,
}) => {
  return (
    <div className="space-y-4 w-full max-w-3xl mx-auto">
      {/* Requests Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-2">
        <Input
          className="w-full text-xs"
          placeholder="Req CPU"
          type="number"
          unitType="cpu"
          value={data.requestsCpu}
          onChange={(val) => onChange('requestsCpu', val)}
          displayHelperText
        />
        <Input
          className="w-full text-xs"
          placeholder="Req Mem"
          type="number"
          unitType="memory"
          value={data.requestsMemory}
          onChange={(val) => onChange('requestsMemory', val)}
          displayHelperText
        />
        <Input
          className="w-full text-xs"
          placeholder="Req Storage"
          type="number"
          unitType="storage"
          value={data.requestsStorage}
          onChange={(val) => onChange('requestsStorage', val)}
          displayHelperText
        />
      </div>

      {/* Limits Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-2">
        <Input
          className="w-full text-xs"
          placeholder="Lim CPU"
          type="number"
          unitType="cpu"
          value={data.limitsCpu}
          onChange={(val) => onChange('limitsCpu', val)}
          displayHelperText
        />
        <Input
          className="w-full text-xs"
          placeholder="Lim Mem"
          type="number"
          unitType="memory"
          value={data.limitsMemory}
          onChange={(val) => onChange('limitsMemory', val)}
          displayHelperText
        />
        <Input
          className="w-full text-xs"
          placeholder="Lim Storage"
          type="number"
          unitType="storage"
          value={data.limitsStorage}
          onChange={(val) => onChange('limitsStorage', val)}
          displayHelperText
        />
      </div>

      {/* Actions */}
      <div className="flex gap-2 justify-end mt-4">
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
