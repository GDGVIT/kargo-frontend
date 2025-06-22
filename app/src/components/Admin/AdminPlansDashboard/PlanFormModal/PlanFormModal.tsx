import React from "react";
import Modal from "../../../ui/Modal/Modal";
import Input from "../../../ui/Input/Input";
import Textarea from "../../../ui/Textarea/Textarea";
import AnimatedButton from "../../../ui/AnimatedButton/AnimatedButton";
import { FaMicrochip, FaMemory } from "react-icons/fa6";
import {
  formatCpu,
  formatMemory,
  formatStorage,
  formatMoney,
} from "../../../../utils/resources";
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
              const val = e.target.value.replace(/[^\d.]/g, "");
              setPlanForm((f) => ({ ...f, requestsCpu: val }));
            }}
            placeholder="CPU"
            title="Requests CPU"
            type="number"
            icon={<FaMicrochip />}
            helperText={formatCpu(planForm.requestsCpu)}
          />
          <Input
            label="Requests Memory"
            value={planForm.requestsMemory}
            onChange={(e) => {
              const val = e.target.value.replace(/[^\d.]/g, "");
              setPlanForm((f) => ({ ...f, requestsMemory: val }));
            }}
            placeholder="Memory"
            title="Requests Memory"
            type="number"
            icon={<FaMemory />}
            helperText={formatMemory(planForm.requestsMemory)}
          />
          <Input
            label="Requests Storage"
            value={planForm.requestsStorage}
            onChange={(e) => {
              const val = e.target.value.replace(/[^\d.]/g, "");
              setPlanForm((f) => ({ ...f, requestsStorage: val }));
            }}
            placeholder="Storage"
            title="Requests Storage"
            type="number"
            helperText={formatStorage(planForm.requestsStorage)}
          />
        </div>
        <div className="flex gap-4">
          <Input
            label="Limits CPU"
            value={planForm.limitsCpu}
            onChange={(e) => {
              const val = e.target.value.replace(/[^\d.]/g, "");
              setPlanForm((f) => ({ ...f, limitsCpu: val }));
            }}
            placeholder="CPU"
            title="Limits CPU"
            type="number"
            icon={<FaMicrochip />}
            helperText={formatCpu(planForm.limitsCpu)}
          />
          <Input
            label="Limits Memory"
            value={planForm.limitsMemory}
            onChange={(e) => {
              const val = e.target.value.replace(/[^\d.]/g, "");
              setPlanForm((f) => ({ ...f, limitsMemory: val }));
            }}
            placeholder="Memory"
            title="Limits Memory"
            type="number"
            icon={<FaMemory />}
            helperText={formatMemory(planForm.limitsMemory)}
          />
          <Input
            label="Limits Storage"
            value={planForm.limitsStorage}
            onChange={(e) => {
              const val = e.target.value.replace(/[^\d.]/g, "");
              setPlanForm((f) => ({ ...f, limitsStorage: val }));
            }}
            placeholder="Storage"
            title="Limits Storage"
            type="number"
            helperText={formatStorage(planForm.limitsStorage)}
          />
        </div>
        <Input
          label="Price (in paise)"
          value={planForm.price}
          onChange={(e) => {
            const val = e.target.value.replace(/[^\d]/g, "");
            setPlanForm((f) => ({ ...f, price: val }));
          }}
          placeholder="e.g. 49900 for ₹499.00"
          title="Price in paise"
          type="number"
          required
          helperText={formatMoney(planForm.price)}
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
