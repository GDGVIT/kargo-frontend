import Plan from "./Plan";

// Props for the PlanTable component
export interface PlanTableProps {
  plans: Plan[];
  planLoading: boolean;
  planError: string;
  onEdit: (plan: Plan) => void;
  onDelete: (planId: string) => void;
}
