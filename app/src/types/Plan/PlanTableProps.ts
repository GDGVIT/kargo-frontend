import Plan from "./Plan";

export default interface PlanTableProps {
  plans: Plan[];
  planLoading: boolean;
  planError: string;
  onEdit: (plan: Plan) => void;
  onDelete: (planId: string) => void;
}
