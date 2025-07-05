import React from "react";
import AnimatedButton from "../../../ui/AnimatedButton/AnimatedButton";
import { FaSave, FaTrash, FaBook, FaPowerOff, FaRedo } from "react-icons/fa";
import type ActionButtonsProps from "../../../../types/Application/ActionButtonProps/ActionButtonProps";

const ActionButtons: React.FC<
  ActionButtonsProps & {
    onRemoveDeployment?: () => void;
    onRolloutRestart?: () => void;
  }
> = ({
  saving,
  onSaveAndDeploy,
  onRequestDelete,
  onRemoveDeployment,
  onRolloutRestart,
}) => (
  <div className="flex flex-wrap gap-3">
    <AnimatedButton
      type="submit"
      disabled={saving}
      onClick={onSaveAndDeploy}
      className="!px-4 !py-2"
      icon={<FaSave />}
      variant="primary"
    >
      {saving ? "Saving..." : "Save & Deploy"}
    </AnimatedButton>
    <AnimatedButton
      type="button"
      disabled={saving}
      onClick={onRequestDelete}
      className="!px-4 !py-2"
      icon={<FaTrash />}
      variant="danger"
    >
      Delete Application
    </AnimatedButton>
    <AnimatedButton
      type="button"
      className="!px-4 !py-2"
      onClick={() => {
        if (typeof window !== "undefined" && window.location.pathname) {
          const newUrl = window.location.pathname.replace(
            "/applications",
            "/logs"
          );
          window.location.assign(newUrl);
        }
      }}
      icon={<FaBook />}
      variant="secondary"
    >
      Logs
    </AnimatedButton>
    <AnimatedButton
      type="button"
      disabled={saving}
      onClick={onRemoveDeployment}
      className="!px-4 !py-2"
      icon={<FaPowerOff />}
      variant="warning"
    >
      Remove Deployment
    </AnimatedButton>
    <AnimatedButton
      type="button"
      disabled={saving}
      onClick={onRolloutRestart}
      className="!px-4 !py-2"
      icon={<FaRedo />}
      variant="secondary"
    >
      Restart Deployment
    </AnimatedButton>
  </div>
);

export default ActionButtons;
