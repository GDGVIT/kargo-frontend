import React from "react";
import { FiTrash2 } from "react-icons/fi";
import type EnvVarsSectionProps from "../../../types/Application/EnvVarsSectionProps/EnvVarsSectionProps";
import { AnimatedButton } from "../../ui/AnimatedButton/AnimatedButton";
import { Textarea } from "../../ui/Textarea/Textarea";

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
          <AnimatedButton
            type="button"
            onClick={addEnvVar}
            className="!px-2 !py-1 !text-xs"
            icon={null}
          >
            + Add
          </AnimatedButton>
          <AnimatedButton
            type="button"
            onClick={() => setShowValues((v) => !v)}
            className="!px-2 !py-1 !text-xs !bg-gray-200 !text-gray-700 hover:!bg-gray-300 border border-gray-300"
            icon={null}
          >
            {showValues ? "Hide Values" : "Show Values"}
          </AnimatedButton>
        </div>
      </label>
      <div className="space-y-2">
        {envList.length === 0 && (
          <div className="text-gray-400">No environment variables</div>
        )}
        {envList.map(([key, value], idx) => (
          <div key={idx} className="flex items-center gap-2">
            <Textarea
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
              className="!mb-0 !min-h-[32px] !max-h-[32px] !resize-none !text-xs"
            />
            <span>=</span>
            {showValues ? (
              <Textarea
                placeholder="VALUE"
                value={value}
                onChange={(e) => handleEnvChange(idx, key, e.target.value)}
                className="!mb-0 !min-h-[32px] !max-h-[32px] !resize-none !text-xs"
              />
            ) : (
              <input
                placeholder="VALUE"
                value={value}
                type="password"
                onChange={(e) => handleEnvChange(idx, key, e.target.value)}
              />
            )}
            <AnimatedButton
              type="button"
              onClick={() => removeEnvVar(idx)}
              className="!px-2 !py-1 !text-xs !bg-red-500 !text-white hover:!bg-red-600"
              icon={<FiTrash2 />}
              title="Remove"
            >
              <span className="sr-only">Remove</span>
            </AnimatedButton>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnvVarsSection;
