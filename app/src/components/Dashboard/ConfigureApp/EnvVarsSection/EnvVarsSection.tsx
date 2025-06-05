import React from "react";

interface EnvVarsSectionProps {
  envList: [string, string][];
  handleEnvChange: (idx: number, key: string, value: string) => void;
  addEnvVar: () => void;
  removeEnvVar: (idx: number) => void;
}

const EnvVarsSection: React.FC<EnvVarsSectionProps> = ({
  envList,
  handleEnvChange,
  addEnvVar,
  removeEnvVar,
}) => (
  <div>
    <label className="mb-1 font-medium flex items-center justify-between">
      Environment Variables
      <button
        type="button"
        className="ml-2 px-2 py-1 bg-blue-700 rounded text-xs hover:bg-blue-800"
        onClick={addEnvVar}
      >
        + Add
      </button>
    </label>
    <div className="space-y-2">
      {envList.length === 0 && (
        <div className="text-gray-500 text-sm">No environment variables</div>
      )}
      {envList.map(([key, value], idx) => (
        <div key={idx} className="flex gap-2 items-center">
          <input
            className="p-2 rounded  border border-gray-700 flex-1 text-sm"
            placeholder="KEY"
            value={key}
            onChange={(e) => handleEnvChange(idx, e.target.value, value)}
          />
          <span className="text-gray-400">=</span>
          <input
            className="p-2 rounded  border border-gray-700 flex-1 text-sm"
            placeholder="VALUE"
            value={value}
            onChange={(e) => handleEnvChange(idx, key, e.target.value)}
          />
          <button
            type="button"
            className="ml-2 px-2 py-1 bg-red-700 rounded text-xs hover:bg-red-800"
            onClick={() => removeEnvVar(idx)}
            title="Remove"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default EnvVarsSection;
