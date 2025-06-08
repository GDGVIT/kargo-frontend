import React, { useState } from "react";
import { FaTimes, FaCopy, FaDocker } from "react-icons/fa";

interface DockerModalProps {
  open: boolean;
  dockerfile?: string;
  dockerCompose?: string;
  repoName?: string;
  onClose: () => void;
}

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
    // Remove leading/trailing \n and quotes
    formatted = formatted.replace(/^\\n+|\\n+$/g, "");
    // Remove leading # No codebase provided and following newlines
    formatted = formatted.replace(/^# No codebase provided\s*\n?/i, "");
    // Remove any escaped single/double quotes at start/end
    formatted = formatted.replace(/^['"]|['"]$/g, "");
    // Replace all \n with real newlines
    formatted = formatted.replace(/\\n/g, "\n");
    // Remove accidental double newlines
    formatted = formatted.replace(/\n{3,}/g, "\n\n");
    // Remove trailing whitespace on each line
    formatted = formatted
      .split("\n")
      .map((line) => line.trimEnd())
      .join("\n");
    // Remove extra single quotes around YAML keys/values (common in AI output)
    formatted = formatted.replace(/'([^']+)'/g, "$1");
    // Remove extra backslashes before quotes
    formatted = formatted.replace(/\\'/g, "'").replace(/\\"/g, '"');
    // Remove any leading or trailing single/double quotes on each line
    formatted = formatted
      .split("\n")
      .map((line) => line.replace(/^['"]|['"]$/g, ""))
      .join("\n");
    // Remove escaped numbers like \3\ (common in AI YAML output)
    formatted = formatted.replace(/\\(\d+)\\/g, "$1");
    return formatted;
  };

  const renderTabContent = () => {
    if (activeTab === "dockerfile" && dockerfile) {
      return (
        <div className="relative">
          <button
            className="absolute top-2 right-2 text-xs px-2 py-1 bg-blue-700 hover:bg-blue-800 text-white rounded flex items-center gap-1"
            onClick={() => handleCopy(formatContent(dockerfile), "dockerfile")}
          >
            <FaCopy /> {copied === "dockerfile" ? "Copied!" : "Copy"}
          </button>
          <pre className="bg-neutral-800 rounded p-4 text-sm overflow-x-auto text-blue-200 whitespace-pre-wrap border border-blue-700 shadow-inner mt-6">
            {formatContent(dockerfile)}
          </pre>
        </div>
      );
    }
    if (activeTab === "dockerCompose" && dockerCompose) {
      return (
        <div className="relative">
          <button
            className="absolute top-2 right-2 text-xs px-2 py-1 bg-pink-700 hover:bg-pink-800 text-white rounded flex items-center gap-1"
            onClick={() =>
              handleCopy(formatContent(dockerCompose), "dockerCompose")
            }
          >
            <FaCopy /> {copied === "dockerCompose" ? "Copied!" : "Copy"}
          </button>
          <pre className="bg-neutral-800 rounded p-4 text-sm overflow-x-auto text-pink-200 whitespace-pre-wrap border border-pink-700 shadow-inner mt-6">
            {formatContent(dockerCompose)}
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
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
