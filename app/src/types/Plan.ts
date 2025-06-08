export interface Plan {
  _id: string;
  name: string;
  description?: string;
  resources: {
    requests?: { cpu?: string; memory?: string };
    limits?: { cpu?: string; memory?: string };
  };
  isDefault?: boolean;
  price?: number;
  isActive?: boolean;
}

// Plan form state shape for admin plan creation/editing
export interface PlanForm {
  name: string;
  description: string;
  requestsCpu: string;
  requestsMemory: string;
  limitsCpu: string;
  limitsMemory: string;
  isDefault: boolean;
  isActive: boolean;
}

// Props for the PlanFormModal component
export interface PlanFormModalProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  planForm: PlanForm;
  setPlanForm: React.Dispatch<React.SetStateAction<PlanForm>>;
  planFormLoading: boolean;
  planFormError: string;
  editingPlan: Plan | null;
}

// Props for the PlanTable component
export interface PlanTableProps {
  plans: Plan[];
  planLoading: boolean;
  planError: string;
  onEdit: (plan: Plan) => void;
  onDelete: (planId: string) => void;
}

// Props for the ExtraResourcesEditor component
export interface ExtraResourcesEditorProps {
  userId: string;
  data: {
    requestsCpu: string;
    requestsMemory: string;
    limitsCpu: string;
    limitsMemory: string;
  };
  onChange: (field: string, value: string) => void;
  onSave: () => void;
  onCancel: () => void;
  saving: boolean;
}

export interface PlanDetailsProps {
  planId?: string;
  planObj?: Plan;
}
