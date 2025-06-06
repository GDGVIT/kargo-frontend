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
  <div className="mb-6">
    <label className="text-sm font-medium text-gray-700 mb-2 flex items-center justify-between">
      <span>Environment Variables</span>
      <button
        type="button"
        onClick={addEnvVar}
        className="ml-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs"
      >
        + Add
      </button>
    </label>
    <div className="space-y-2">
      {envList.length === 0 && (
        <div className="text-gray-400">No environment variables</div>
      )}
      {envList.map(([key, value], idx) => (
        <div key={idx} className="flex items-center gap-2">
          <input
            placeholder="KEY"
            value={key}
            onChange={(e) => handleEnvChange(idx, e.target.value, value)}
            className="px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 text-sm"
          />
          <span>=</span>
          <input
            placeholder="VALUE"
            value={value}
            onChange={(e) => handleEnvChange(idx, key, e.target.value)}
            className="px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 text-sm"
          />
          <button
            type="button"
            onClick={() => removeEnvVar(idx)}
            title="Remove"
            className="ml-1 px-2 py-1 text-red-500 hover:text-white hover:bg-red-500 rounded transition-colors text-xs"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default EnvVarsSection;
