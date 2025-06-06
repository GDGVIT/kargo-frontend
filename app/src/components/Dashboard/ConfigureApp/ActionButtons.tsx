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
    <button type="submit" disabled={saving}>
      {saving ? "Saving..." : "Save Changes"}
    </button>
    <button type="button" disabled={saving} onClick={onApply}>
      Apply (Deploy to Kubernetes)
    </button>
    <button type="button" disabled={saving} onClick={onRemoveDeployment}>
      Remove Deployment
    </button>
    <button type="button" disabled={saving} onClick={onRemoveNamespace}>
      Remove Namespace
    </button>
  </>
);

export default ActionButtons;
