import React from "react";
import Modal from "../../../ui/Modal/Modal";
import Input from "../../../ui/Input/Input";
import Textarea from "../../../ui/Textarea/Textarea";
import AnimatedButton from "../../../ui/AnimatedButton/AnimatedButton";
import { FaMicrochip, FaMemory } from "react-icons/fa6";
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
            onChange={(e) => {
              setPlanForm((f) => ({ ...f, requestsCpu: e.target.value }));
            }}
            placeholder="CPU"
            title="Requests CPU"
            type="text"
            icon={<FaMicrochip />}
          />
          <Input
            label="Requests Memory"
            value={planForm.requestsMemory}
            onChange={(e) => {
              setPlanForm((f) => ({ ...f, requestsMemory: e.target.value }));
            }}
            placeholder="Memory"
            title="Requests Memory"
            type="text"
            icon={<FaMemory />}
          />
          <Input
            label="Requests Storage"
            value={planForm.requestsStorage}
            onChange={(e) => {
              setPlanForm((f) => ({ ...f, requestsStorage: e.target.value }));
            }}
            placeholder="Storage"
            title="Requests Storage"
            type="text"
          />
        </div>
        <div className="flex gap-4">
          <Input
            label="Limits CPU"
            value={planForm.limitsCpu}
            onChange={(e) => {
              setPlanForm((f) => ({ ...f, limitsCpu: e.target.value }));
            }}
            placeholder="CPU"
            title="Limits CPU"
            type="text"
            icon={<FaMicrochip />}
          />
          <Input
            label="Limits Memory"
            value={planForm.limitsMemory}
            onChange={(e) => {
              setPlanForm((f) => ({ ...f, limitsMemory: e.target.value }));
            }}
            placeholder="Memory"
            title="Limits Memory"
            type="text"
            icon={<FaMemory />}
          />
          <Input
            label="Limits Storage"
            value={planForm.limitsStorage}
            onChange={(e) => {
              setPlanForm((f) => ({ ...f, limitsStorage: e.target.value }));
            }}
            placeholder="Storage"
            title="Limits Storage"
            type="text"
          />
        </div>
        <Input
          label="Price (in paise)"
          value={planForm.price}
          onChange={(e) => {
            setPlanForm((f) => ({ ...f, price: e.target.value }));
          }}
          placeholder="e.g. 49900 for ₹499.00"
          title="Price in paise"
          type="number"
          required
        />
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
