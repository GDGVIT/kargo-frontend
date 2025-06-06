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
    <label>
      Environment Variables
      <button type="button" onClick={addEnvVar}>
        + Add
      </button>
    </label>
    <div>
      {envList.length === 0 && <div>No environment variables</div>}
      {envList.map(([key, value], idx) => (
        <div key={idx}>
          <input
            placeholder="KEY"
            value={key}
            onChange={(e) => handleEnvChange(idx, e.target.value, value)}
          />
          <span>=</span>
          <input
            placeholder="VALUE"
            value={value}
            onChange={(e) => handleEnvChange(idx, key, e.target.value)}
          />
          <button
            type="button"
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
