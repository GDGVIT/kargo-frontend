import React from "react";
import { FiTrash2 } from "react-icons/fi";

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
}) => {
  const [showValues, setShowValues] = React.useState(false);

  // Helper to sanitize env var names
  const sanitizeKey = (key: string) =>
    key.replace(/[^a-zA-Z0-9_]/g, "").replace(/^\d+/, "");

  // Handler for single key input
  const handleKeyInput = (idx: number, rawKey: string, value: string) => {
    const key = sanitizeKey(rawKey);
    handleEnvChange(idx, key, value);
  };

  return (
    <div className="mb-6">
      <label className="text-gray-400 mb-2 flex items-center justify-between">
        <h3 className="text-gray-400 mb-2">Environment Variables</h3>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={addEnvVar}
            className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs"
          >
            + Add
          </button>
          <button
            type="button"
            onClick={() => setShowValues((v) => !v)}
            className="px-2 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-xs border border-gray-300"
          >
            {showValues ? "Hide Values" : "Show Values"}
          </button>
        </div>
      </label>
      <div className="space-y-2">
        {envList.length === 0 && (
          <div className="text-gray-400">No environment variables</div>
        )}
        {envList.map(([key, value], idx) => (
          <div key={idx} className="flex items-center gap-2">
            <textarea
              placeholder="KEY"
              value={key}
              onChange={(e) => handleKeyInput(idx, e.target.value, value)}
              onPaste={(e) => {
                const paste = e.clipboardData.getData("text");
                if (paste.includes("=")) {
                  e.preventDefault();
                  const lines = paste.split(/\r?\n/).filter(Boolean);
                  let didAdd = false;
                  lines.forEach((line, i) => {
                    const trimmed = line.trim();
                    if (
                      !trimmed ||
                      trimmed.startsWith("#") ||
                      trimmed.startsWith("//")
                    )
                      return;
                    const eqIdx = trimmed.indexOf("=");
                    if (eqIdx === -1) return;
                    let pastedKey = trimmed.slice(0, eqIdx).trim();
                    const pastedValue = trimmed.slice(eqIdx + 1).trim();
                    pastedKey = sanitizeKey(pastedKey);
                    if (!pastedKey) return;
                    if (i === 0) {
                      handleEnvChange(idx, pastedKey, pastedValue);
                    } else {
                      addEnvVar();
                      setTimeout(() => {
                        handleEnvChange(
                          envList.length + (didAdd ? i - 1 : 0),
                          pastedKey,
                          pastedValue
                        );
                      }, 0);
                      didAdd = true;
                    }
                  });
                } else if (paste.includes("\t") || paste.includes(",")) {
                  // Support tab or comma separated paste for key,value
                  e.preventDefault();
                  let pastedKey = "";
                  let pastedValue = "";
                  if (paste.includes("\t")) {
                    [pastedKey, pastedValue] = paste.split("\t");
                  } else {
                    [pastedKey, pastedValue] = paste.split(",");
                  }
                  pastedKey = sanitizeKey((pastedKey || "").trim());
                  pastedValue = (pastedValue || "").trim();
                  if (pastedKey) handleEnvChange(idx, pastedKey, pastedValue);
                }
              }}
              title="Only letters, numbers, and underscores allowed. No =, spaces, or special chars."
              rows={1}
            />
            <span>=</span>
            {showValues ? (
              <textarea
                placeholder="VALUE"
                value={value}
                onChange={(e) => handleEnvChange(idx, key, e.target.value)}
                onPaste={(e) => {
                  const paste = e.clipboardData.getData("text");
                  if (paste.includes("=")) {
                    e.preventDefault();
                    const lines = paste.split(/\r?\n/).filter(Boolean);
                    let didAdd = false;
                    lines.forEach((line, i) => {
                      const trimmed = line.trim();
                      if (
                        !trimmed ||
                        trimmed.startsWith("#") ||
                        trimmed.startsWith("//")
                      )
                        return;
                      const eqIdx = trimmed.indexOf("=");
                      if (eqIdx === -1) return;
                      let pastedKey = trimmed.slice(0, eqIdx).trim();
                      const pastedValue = trimmed.slice(eqIdx + 1).trim();
                      pastedKey = sanitizeKey(pastedKey);
                      if (!pastedKey) return;
                      if (i === 0) {
                        handleEnvChange(idx, pastedKey, pastedValue);
                      } else {
                        addEnvVar();
                        setTimeout(() => {
                          handleEnvChange(
                            envList.length + (didAdd ? i - 1 : 0),
                            pastedKey,
                            pastedValue
                          );
                        }, 0);
                        didAdd = true;
                      }
                    });
                  } else if (paste.includes("\t") || paste.includes(",")) {
                    // Support tab or comma separated paste for key,value
                    e.preventDefault();
                    let pastedKey = "";
                    let pastedValue = "";
                    if (paste.includes("\t")) {
                      [pastedKey, pastedValue] = paste.split("\t");
                    } else {
                      [pastedKey, pastedValue] = paste.split(",");
                    }
                    pastedKey = sanitizeKey((pastedKey || "").trim());
                    pastedValue = (pastedValue || "").trim();
                    if (pastedKey) handleEnvChange(idx, pastedKey, pastedValue);
                  }
                }}
                className="px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 text-sm min-w-[120px] resize-y"
                rows={1}
              />
            ) : (
              <input
                placeholder="VALUE"
                value={value}
                type="password"
                onChange={(e) => handleEnvChange(idx, key, e.target.value)}
              />
            )}
            <button
              type="button"
              onClick={() => removeEnvVar(idx)}
              title="Remove"
              className="ml-1 px-2 py-1 text-red-500 hover:text-white hover:bg-red-500 rounded transition-colors text-xs flex items-center justify-center"
            >
              <FiTrash2 />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnvVarsSection;
