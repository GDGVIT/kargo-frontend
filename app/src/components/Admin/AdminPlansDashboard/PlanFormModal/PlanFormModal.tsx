import React from "react";

interface PlanForm {
  name: string;
  description: string;
  requestsCpu: string;
  requestsMemory: string;
  limitsCpu: string;
  limitsMemory: string;
  isDefault: boolean;
  isActive: boolean;
}

interface Plan {
  _id: string;
  name: string;
  description?: string;
  resources?: {
    requests?: { cpu?: string; memory?: string };
    limits?: { cpu?: string; memory?: string };
  };
  isDefault?: boolean;
  isActive?: boolean;
}

interface PlanFormModalProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  planForm: PlanForm;
  setPlanForm: React.Dispatch<React.SetStateAction<PlanForm>>;
  planFormLoading: boolean;
  planFormError: string;
  editingPlan: Plan | null;
}

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
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <form
        className="bg-neutral-900 p-8 rounded-xl border border-neutral-700 w-full max-w-lg space-y-4 relative"
        onSubmit={onSubmit}
      >
        <button
          type="button"
          className="absolute top-3 right-3 text-zinc-400 hover:text-white"
          onClick={onClose}
        >
          ✕
        </button>
        <h3 className="text-lg font-bold mb-2">
          {editingPlan ? "Edit Plan" : "New Plan"}
        </h3>
        <div>
          <label className="block mb-1">Name</label>
          <input
            className="w-full p-2 rounded bg-neutral-800 border border-neutral-700 text-white"
            value={planForm.name}
            onChange={(e) =>
              setPlanForm((f) => ({ ...f, name: e.target.value }))
            }
            required
            placeholder="Plan name"
            title="Plan name"
          />
        </div>
        <div>
          <label className="block mb-1">Description</label>
          <textarea
            className="w-full p-2 rounded bg-neutral-800 border border-neutral-700 text-white"
            value={planForm.description}
            onChange={(e) =>
              setPlanForm((f) => ({ ...f, description: e.target.value }))
            }
            placeholder="Description"
            title="Description"
          />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block mb-1">Requests CPU</label>
            <input
              className="w-full p-2 rounded bg-neutral-800 border border-neutral-700 text-white"
              value={planForm.requestsCpu}
              onChange={(e) =>
                setPlanForm((f) => ({ ...f, requestsCpu: e.target.value }))
              }
              placeholder="CPU"
              title="Requests CPU"
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1">Requests Memory</label>
            <input
              className="w-full p-2 rounded bg-neutral-800 border border-neutral-700 text-white"
              value={planForm.requestsMemory}
              onChange={(e) =>
                setPlanForm((f) => ({ ...f, requestsMemory: e.target.value }))
              }
              placeholder="Memory"
              title="Requests Memory"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block mb-1">Limits CPU</label>
            <input
              className="w-full p-2 rounded bg-neutral-800 border border-neutral-700 text-white"
              value={planForm.limitsCpu}
              onChange={(e) =>
                setPlanForm((f) => ({ ...f, limitsCpu: e.target.value }))
              }
              placeholder="CPU"
              title="Limits CPU"
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1">Limits Memory</label>
            <input
              className="w-full p-2 rounded bg-neutral-800 border border-neutral-700 text-white"
              value={planForm.limitsMemory}
              onChange={(e) =>
                setPlanForm((f) => ({ ...f, limitsMemory: e.target.value }))
              }
              placeholder="Memory"
              title="Limits Memory"
            />
          </div>
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
        <button
          type="submit"
          className="w-full py-2 rounded bg-sky-600 text-white font-semibold hover:bg-sky-700 disabled:opacity-50"
          disabled={planFormLoading}
        >
          {planFormLoading
            ? "Saving..."
            : editingPlan
            ? "Update Plan"
            : "Create Plan"}
        </button>
      </form>
    </div>
  );
};

export default PlanFormModal;
