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
  <>
    <button
      type="submit"
      className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 font-semibold text-lg shadow transition disabled:opacity-60"
      disabled={saving}
    >
      {saving ? "Saving..." : "Save Changes"}
    </button>
    <button
      type="button"
      className="w-full py-3 rounded-lg bg-green-600 hover:bg-green-700 font-semibold text-lg shadow transition disabled:opacity-60 mt-2"
      disabled={saving}
      onClick={onApply}
    >
      Apply (Deploy to Kubernetes)
    </button>
    <button
      type="button"
      className="w-full py-3 rounded-lg bg-red-600 hover:bg-red-700 font-semibold text-lg shadow transition disabled:opacity-60 mt-2"
      disabled={saving}
      onClick={onRemoveDeployment}
    >
      Remove Deployment
    </button>
    <button
      type="button"
      className="w-full py-3 rounded-lg bg-yellow-600 hover:bg-yellow-700 font-semibold text-lg shadow transition disabled:opacity-60 mt-2"
      disabled={saving}
      onClick={onRemoveNamespace}
    >
      Remove Namespace
    </button>
  </>
);

export default ActionButtons;
