import React, { useState } from "react";
import { FaTimes, FaCopy, FaDocker } from "react-icons/fa";
import DockerModalProps from "../../../../types/DockerModalProps/DockerModalProps";
import { DockerfileParser } from "dockerfile-ast";
import yaml from "js-yaml";

const DockerModal: React.FC<DockerModalProps> = ({
  open,
  dockerfile,
  dockerCompose,
  repoName,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState(
    dockerfile ? "dockerfile" : "dockerCompose"
  );
  const [copied, setCopied] = useState<string | null>(null);

  if (!open) return null;

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 1500);
  };

  const formatContent = (content?: string) => {
    if (!content) return "";
    let formatted = content.trim();

    formatted = formatted.replace(/^\\n+|\\n+$/g, "");

    formatted = formatted.replace(/^# No codebase provided\s*\n?/i, "");

    formatted = formatted.replace(/^['"]|['"]$/g, "");

    formatted = formatted.replace(/\\n/g, "\n");

    formatted = formatted.replace(/\n{3,}/g, "\n\n");

    formatted = formatted
      .split("\n")
      .map((line) => line.trimEnd())
      .join("\n");

    formatted = formatted.replace(/'([^']+)'/g, "$1");

    formatted = formatted.replace(/\\'/g, "'").replace(/\\"/g, '"');

    formatted = formatted
      .split("\n")
      .map((line) => line.replace(/^['"]|['"]$/g, ""))
      .join("\n");

    formatted = formatted.replace(/\\(\d+)\\/g, "$1");
    return formatted;
  };

  const validateDockerfile = (content?: string) => {
    if (!content) return { valid: false, error: "No Dockerfile content" };
    try {
      DockerfileParser.parse(content);
      return { valid: true };
    } catch (e) {
      return {
        valid: false,
        error: e instanceof Error ? e.message : String(e),
      };
    }
  };

  const validateDockerCompose = (content?: string) => {
    if (!content)
      return { valid: false, error: "No docker-compose.yml content" };
    try {
      yaml.load(content);
      return { valid: true };
    } catch (e: unknown) {
      return {
        valid: false,
        error: e instanceof Error ? e.message : String(e),
      };
    }
  };

  const formatDockerCompose = (content?: string) => {
    if (!content) return "";
    try {
      const obj = yaml.load(content);
      return yaml.dump(obj, { noRefs: true, lineWidth: 120 });
    } catch {
      return content;
    }
  };

  const renderTabContent = () => {
    if (activeTab === "dockerfile" && dockerfile) {
      const validation = validateDockerfile(dockerfile);
      if (!validation.valid) {
        return (
          <div className="text-center text-red-400 mt-6">
            <p className="mb-2 font-semibold">
              Invalid Dockerfile: {validation.error}
            </p>
          </div>
        );
      }
      return (
        <div className="relative">
          <button
            className="absolute top-2 right-2 text-xs px-2 py-1 bg-blue-700 hover:bg-blue-800 text-white rounded flex items-center gap-1"
            onClick={() => handleCopy(formatContent(dockerfile), "dockerfile")}
          >
            <FaCopy /> {copied === "dockerfile" ? "Copied!" : "Copy"}
          </button>
          <pre className="bg-neutral-800 p-4 text-sm overflow-x-auto text-blue-200 whitespace-pre-wrap border border-blue-700 shadow-inner mt-6">
            {formatContent(dockerfile)}
          </pre>
        </div>
      );
    }
    if (activeTab === "dockerCompose" && dockerCompose) {
      const validation = validateDockerCompose(dockerCompose);
      if (!validation.valid) {
        return (
          <div className="text-center text-red-400 mt-6">
            <p className="mb-2 font-semibold">
              Invalid docker-compose.yml: {validation.error}
            </p>
          </div>
        );
      }
      return (
        <div className="relative">
          <button
            className="absolute top-2 right-2 text-xs px-2 py-1 bg-pink-700 hover:bg-pink-800 text-white rounded flex items-center gap-1"
            onClick={() =>
              handleCopy(formatDockerCompose(dockerCompose), "dockerCompose")
            }
          >
            <FaCopy /> {copied === "dockerCompose" ? "Copied!" : "Copy"}
          </button>
          <pre className="bg-neutral-800 p-4 text-sm overflow-x-auto text-pink-200 whitespace-pre-wrap border border-pink-700 shadow-inner mt-6">
            {formatDockerCompose(dockerCompose)}
          </pre>
        </div>
      );
    }
    return (
      <div className="text-center text-red-400 mt-6">
        <p className="mb-2 font-semibold">
          No {activeTab === "dockerfile" ? "Dockerfile" : "docker-compose.yml"}{" "}
          could be generated for this repository.
        </p>
        <p className="text-xs text-zinc-400">
          This may be due to an unsupported project structure or missing
          configuration files in the repository.
        </p>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-neutral-900 rounded-2xl shadow-2xl p-8 max-w-2xl w-full relative border-2 border-sky-700 animate-fadeIn">
        <button
          className="absolute top-4 right-4 text-zinc-400 hover:text-white text-2xl"
          onClick={onClose}
          aria-label="Close"
        >
          <FaTimes />
        </button>
        <h2 className="text-xl font-bold mb-6 text-sky-400 text-center">
          Dockerization for <span className="text-white">{repoName}</span>
        </h2>
        <div className="flex justify-center mb-4 gap-2">
          <button
            className={`px-4 py-2 rounded-t-lg font-semibold transition-colors duration-200 border-b-2 focus:outline-none flex items-center gap-2 ${
              activeTab === "dockerfile"
                ? "bg-blue-700 text-white border-blue-400"
                : "bg-neutral-800 text-zinc-400 border-transparent hover:bg-neutral-700"
            }`}
            onClick={() => setActiveTab("dockerfile")}
            disabled={!dockerfile}
          >
            <FaDocker
              className={`text-lg ${
                activeTab === "dockerfile" ? "text-blue-200" : "text-zinc-400"
              }`}
            />{" "}
            Dockerfile
          </button>
          <button
            className={`px-4 py-2 rounded-t-lg font-semibold transition-colors duration-200 border-b-2 focus:outline-none flex items-center gap-2 ${
              activeTab === "dockerCompose"
                ? "bg-pink-700 text-white border-pink-400"
                : "bg-neutral-800 text-zinc-400 border-transparent hover:bg-neutral-700"
            }`}
            onClick={() => setActiveTab("dockerCompose")}
            disabled={!dockerCompose}
          >
            <FaDocker className="text-lg text-pink-200" /> docker-compose.yml
          </button>
        </div>
        <div className="max-h-[50vh] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900 rounded-lg">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default DockerModal;
