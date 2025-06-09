import React from "react";
import Modal from "../../../ui/Modal/Modal";
import { Input } from "../../../ui/Input/Input";
import { Textarea } from "../../../ui/Textarea/Textarea";
import { AnimatedButton } from "../../../ui/AnimatedButton/AnimatedButton";
import type PlanFormModalProps from "../../../../types/Plan/PlanFormModalProps";

const PlanFormModal: React.FC<PlanFormModalProps> = ({
  show,
  onClose,
  onSubmit,
  planForm,
  setPlanForm,
  planFormLoading,
  planFormError,
  editingPlan,
}) => {
  if (!show) return null;
  return (
    <Modal
      open={show}
      onClose={onClose}
      title={editingPlan ? "Edit Plan" : "New Plan"}
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <Input
          label="Name"
          value={planForm.name}
          onChange={(e) => setPlanForm((f) => ({ ...f, name: e.target.value }))}
          required
          placeholder="Plan name"
          title="Plan name"
        />
        <Textarea
          label="Description"
          value={planForm.description}
          onChange={(e) =>
            setPlanForm((f) => ({ ...f, description: e.target.value }))
          }
          placeholder="Description"
          title="Description"
        />
        <div className="flex gap-4">
          <Input
            label="Requests CPU"
            value={planForm.requestsCpu}
            onChange={(e) =>
              setPlanForm((f) => ({ ...f, requestsCpu: e.target.value }))
            }
            placeholder="CPU"
            title="Requests CPU"
          />
          <Input
            label="Requests Memory"
            value={planForm.requestsMemory}
            onChange={(e) =>
              setPlanForm((f) => ({ ...f, requestsMemory: e.target.value }))
            }
            placeholder="Memory"
            title="Requests Memory"
          />
        </div>
        <div className="flex gap-4">
          <Input
            label="Limits CPU"
            value={planForm.limitsCpu}
            onChange={(e) =>
              setPlanForm((f) => ({ ...f, limitsCpu: e.target.value }))
            }
            placeholder="CPU"
            title="Limits CPU"
          />
          <Input
            label="Limits Memory"
            value={planForm.limitsMemory}
            onChange={(e) =>
              setPlanForm((f) => ({ ...f, limitsMemory: e.target.value }))
            }
            placeholder="Memory"
            title="Limits Memory"
          />
        </div>
        <div className="flex gap-4 items-center">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={planForm.isDefault}
              onChange={(e) =>
                setPlanForm((f) => ({ ...f, isDefault: e.target.checked }))
              }
            />
            Default (BASE)
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={planForm.isActive}
              onChange={(e) =>
                setPlanForm((f) => ({ ...f, isActive: e.target.checked }))
              }
            />
            Active
          </label>
        </div>
        {planFormError && <div className="text-red-500">{planFormError}</div>}
        <AnimatedButton
          type="submit"
          className="w-full py-2 !rounded !bg-sky-600 hover:!bg-sky-700 font-semibold"
          icon={null}
        >
          {planFormLoading
            ? "Saving..."
            : editingPlan
            ? "Update Plan"
            : "Create Plan"}
        </AnimatedButton>
      </form>
    </Modal>
  );
};

export default PlanFormModal;
