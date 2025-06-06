import React from "react";

interface ActionButtonsProps {
  saving: boolean;
  onSaveAndDeploy: (e: React.FormEvent) => void;
  onDelete: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  saving,
  onSaveAndDeploy,
  onDelete,
}) => (
  <div className="flex flex-wrap gap-3 mt-6">
    <button
      type="submit"
      disabled={saving}
      onClick={onSaveAndDeploy}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
    >
      {saving ? "Saving..." : "Save & Deploy"}
    </button>
    <button
      type="button"
      disabled={saving}
      onClick={onDelete}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
    >
      Delete Application
    </button>
    <button
      type="button"
      className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition-colors"
      onClick={() => {
        if (typeof window !== "undefined" && window.location.pathname) {
          window.location.assign(window.location.pathname + "/logs");
        }
      }}
    >
      Logs
    </button>
  </div>
);

export default ActionButtons;
