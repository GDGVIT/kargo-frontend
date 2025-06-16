import React from "react";
import { FiTrash2 } from "react-icons/fi";
import { FaPlus, FaEye, FaEyeSlash } from "react-icons/fa";
import type EnvVarsSectionProps from "../../../../types/Application/EnvVarsSectionProps/EnvVarsSectionProps";
import AnimatedButton from "../../../ui/AnimatedButton/AnimatedButton";
import Input from "../../../ui/Input/Input";

const EnvVarsSection: React.FC<EnvVarsSectionProps> = ({
  envList,
  handleEnvChange,
  addEnvVar,
  removeEnvVar,
}) => {
  const [showValues, setShowValues] = React.useState(false);

  const sanitizeKey = (key: string) =>
    key.replace(/[^a-zA-Z0-9_]/g, "").replace(/^\d+/, "");

  const handleKeyInput = (idx: number, rawKey: string, value: string) => {
    const key = sanitizeKey(rawKey);
    handleEnvChange(idx, key, value);
  };

  const handlePaste = (
    e: React.ClipboardEvent<HTMLInputElement>,
    idx: number,
    envList: [string, string][],
    handleEnvChange: (idx: number, key: string, value: string) => void,
    addEnvVar: () => void,
    sanitizeKey: (key: string) => string
  ) => {
    const paste = e.clipboardData.getData("text");
    if (paste.includes("=")) {
      e.preventDefault();
      const lines = paste.split(/\r?\n/).filter(Boolean);
      let didAdd = false;
      lines.forEach((line, i) => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#") || trimmed.startsWith("//"))
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
  };

  return (
    <div className="mb-6">
      <h3 className="text-gray-400 mb-2" style={{ margin: 0 }}>
        Environment Variables
      </h3>
      <div className="flex gap-2">
        <AnimatedButton
          type="button"
          onClick={addEnvVar}
          className="!px-2 !py-1 !text-xs"
          icon={<FaPlus />}
        >
          Add
        </AnimatedButton>
        <AnimatedButton
          type="button"
          onClick={() => setShowValues((v) => !v)}
          className="!px-2 !py-1 !text-xs !bg-gray-200 !text-gray-700 hover:!bg-gray-300 border border-gray-300"
          icon={showValues ? <FaEyeSlash /> : <FaEye />}
        >
          {showValues ? "Hide Values" : "Show Values"}
        </AnimatedButton>
      </div>

      <div className="space-y-2 mt-2">
        {envList.length === 0 && (
          <div className="text-gray-400">No environment variables</div>
        )}
        {envList.map(([key, value], idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 w-full min-h-8 py-1"
          >
            <Input
              placeholder="KEY"
              value={key}
              label="Name"
              onChange={(e) => handleKeyInput(idx, e.target.value, value)}
              onPaste={(e) =>
                handlePaste(
                  e,
                  idx,
                  envList,
                  handleEnvChange,
                  addEnvVar,
                  sanitizeKey
                )
              }
            />

            <Input
              placeholder="VALUE"
              value={value}
              label="Value"
              onChange={(e) => handleEnvChange(idx, key, e.target.value)}
              type={showValues ? "text" : "password"}
            />

            <AnimatedButton
              type="button"
              onClick={() => removeEnvVar(idx)}
              icon={<FiTrash2 />}
              title="Remove"
              variant="danger"
            >
              Remove
            </AnimatedButton>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnvVarsSection;
