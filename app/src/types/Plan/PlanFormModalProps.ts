import Plan from './Plan';
import PlanForm from './PlanForm';

export default interface PlanFormModalProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  planForm: PlanForm;
  setPlanForm: React.Dispatch<React.SetStateAction<PlanForm>>;
  planFormLoading: boolean;
  planFormError: string;
  editingPlan: Plan | null;
}
