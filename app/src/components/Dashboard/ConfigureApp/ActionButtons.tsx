import React from "react";
import { AnimatedButton } from "../../ui/AnimatedButton/AnimatedButton";

import type ActionButtonsProps from "../../../types/Application/ActionButtonProps/ActionButtonProps";

const ActionButtons: React.FC<ActionButtonsProps> = ({
  saving,
  onSaveAndDeploy,
  onRequestDelete,
}) => (
  <div className="flex flex-wrap gap-3 mt-6">
    <AnimatedButton
      type="submit"
      disabled={saving}
      onClick={onSaveAndDeploy}
      className="!px-4 !py-2"
      icon={null}
      variant="primary"
    >
      {saving ? "Saving..." : "Save & Deploy"}
    </AnimatedButton>
    <AnimatedButton
      type="button"
      disabled={saving}
      onClick={onRequestDelete}
      className="!px-4 !py-2"
      icon={null}
      variant="danger"
    >
      Delete Application
    </AnimatedButton>
    <AnimatedButton
      type="button"
      className="!px-4 !py-2"
      onClick={() => {
        if (typeof window !== "undefined" && window.location.pathname) {
          window.location.assign(window.location.pathname + "/logs");
        }
      }}
      icon={null}
      variant="secondary"
    >
      Logs
    </AnimatedButton>
  </div>
);

export default ActionButtons;
