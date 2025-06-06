import React from "react";

interface ActionButtonsProps {
  saving: boolean;
  onSave: (e: React.FormEvent) => void;
  onApply: () => Promise<void>;
  onRemoveDeployment: () => void;
  onRemoveNamespace: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  saving,
  onApply,
  onRemoveDeployment,
  onRemoveNamespace,
}) => (
  <div className="flex flex-wrap gap-3 mt-6">
    <button
      type="submit"
      disabled={saving}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
    >
      {saving ? "Saving..." : "Save Changes"}
    </button>
    <button
      type="button"
      disabled={saving}
      onClick={onApply}
      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
    >
      Apply (Deploy to Kubernetes)
    </button>
    <button
      type="button"
      disabled={saving}
      onClick={onRemoveDeployment}
      className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
    >
      Remove Deployment
    </button>
    <button
      type="button"
      disabled={saving}
      onClick={onRemoveNamespace}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
    >
      Remove Namespace
    </button>
  </div>
);

export default ActionButtons;
